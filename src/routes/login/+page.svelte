<script lang="ts">
    import { dev } from '$app/environment'
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'

    const baseUrl = dev ? `http://127.0.0.1:80` : `https://auth.kanime.fr`;
    const state: string = crypto.randomUUID();

    interface Token {
        token: string,
        expires_on: number,
        stg?: string
    }

    let email: string | undefined;
    let password: string | undefined;
    let otp: string | undefined;

    let loading = false;
    let error: string | undefined;
    let stages: Array<Token> = [];
    $: currentStage = stages.length > 0 ? stages[stages.length - 1] : undefined;

    async function popStage(e?: string){
        if (stages.length === 0 || loading)
            return;
        error = e;
        password = otp = undefined;
        stages.pop();
        stages = stages;
        loading = false;
    }

    async function sendOtp() {
        if (!currentStage || currentStage.stg !== "2fa" || loading)
            return;
        if (!otp){
            error = "Code field is required";
            return;
        }
        otp = otp.replaceAll(' ', '');
        if (otp.length !== 6){
            error = "Invalid code";
            return;
        }
        if (currentStage.expires_on <= Date.now()) {
            popStage("The sign in request has expired");
            return;
        }
        sendSignInRequest('stg', { token: currentStage.token, code: otp, state });
    }

    async function login() {
        email = (email || "").trim();
        if (email.length === 0){
            error = "Email field is required";
            return;
        }
        if (!password || password.length === 0){
            error = "Password field is required";
            return;
        }
        sendSignInRequest('new', { email, password, state });
    }

    async function sendSignInRequest(mode: string, body) {
        loading = true;
        try {
            let res = await fetch(`${baseUrl}/signin/${mode}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(body)
            })
            if (res.status !== 200)
            {
                res = await res.json();
                error = res.errorDescription;
                loading = false;
                return;
            }
            let token: Token = await res.json();
            if (token.stg === "ok")
            {
                let target = "/";
                let follow = $page.url.searchParams.get('to');
                if (typeof follow === "string" && follow.startsWith("/")) {
                    target = follow;
                }
                goto(target);
                stages = [];
                loading = false;
                return;
            }
            stages.push(token);
            stages = stages;
            error = undefined;
        } catch(e) {
            error = e.message;
        }
        loading = false;
    }
</script>

<svelte:head>
    <title>Login - Kanime</title>
    <meta property="description" content="Login to your Kanime Account. Find out what episode or season to watch after or which volume or chapter to read." />
    <meta property="og:locale" content="en_GB" />
</svelte:head>

<div class="body">
    <h1>Login to your account</h1>
    <p>An account is required to proceed to the next step</p>

    {#if error}
        <p class="error">Error: {error}</p>
    {/if}

    {#if currentStage && currentStage.stg === "2fa"}
        <form>
            <h2>Verification code</h2>
            <div class="input">
                <img src="/images/KeyIcon.svg" alt="" />
                <input type="text" placeholder="123 456" bind:value={otp} disabled={loading}>
            </div>

            <button on:click={sendOtp} disabled={loading}>
                {#if loading}
                    <span class="spinner" />
                {:else}
                    Verify
                {/if}
            </button>
            <button on:click={() => popStage()} disabled={loading} class="neutral">
                Back
            </button>
        </form>
    {:else}
        <form>
            <h2>Email</h2>
            <div class="input">
                <img src="/images/EmailIcon.svg" alt="" />
                <input type="text" placeholder="email@example.com" bind:value={email} disabled={loading}>
            </div>

            <h2>Password</h2>
            <div class="input">
                <img src="/images/KeyIcon.svg" alt="" />
                <input type="password" placeholder="****************" bind:value={password} disabled={loading}>
            </div>

            <button on:click={login} disabled={loading}>
                {#if loading}
                    <span class="spinner" />
                {:else}
                    Login
                {/if}
            </button>
        </form>
    {/if}
</div>

<style lang="scss">
    .body {
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        margin-top: 32px;

        h1 {
            text-align: center;
        }

        p {
            color: #A3A3B0;

            &.error {
                color: #181820;
                padding: 4px 8px;
                border-radius: 4px;
                background-color: #F53649; 
                animation: waves infinite 1s;
                outline: 2px solid #F53649;
            }
        }
    }

    @keyframes waves {
        0% {
            outline-offset: 0;
            outline-color: #F536497F;
        }
        75% {
            outline-offset: 5px;
            outline-color: #F5364900;
        }
        100% {
            outline-offset: 0;
            outline-color: #F5364900;
        }
    }

    form {
        display: flex;
        flex-flow: column wrap;
        width: 40vw;
        max-width: 500px;

        h2 {
            font-size: 1rem;
            margin-top: 16px;
            margin-bottom: 8px;
        }

        button { 
            margin: 3rem 0 16px;
        }

        button + button {
            margin-top: 0;
        }

        .input {
            input::placeholder {
                text-align: start;
            }
        }
    }

    @media screen and (max-width: 700px) {
        form {
            width: 90vw;
        }
    }
</style>
