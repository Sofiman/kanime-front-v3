<script>
    let email;
    let password;

    async function login() {
    }
</script>

<svelte:head>
    <title>Login - Kanime</title>
    <meta property="description" content="Login to your Kanime Account. Find out what episode or season to watch after or which volume or chapter to read." />
    <meta property="og:locale" content="en_GB" />
</svelte:head>

<div class="body">
    <h1>Login to your account</h1>

    <form>
        <h2>Email</h2>
        <div class="input">
            <img src="/images/EmailIcon.svg" alt="" />
            <input type="text" placeholder="email@example.com" bind:value={email}>
        </div>

        <h2>Password</h2>
        <div class="input">
            <img src="/images/KeyIcon.svg" alt="" />
            <input type="password" placeholder="****************" bind:value={password}>
        </div>

        <button on:click={login}>Login</button>
    </form>
</div>

<style lang="scss">
    .body {
        display: flex;
        flex-flow: column wrap;
        align-items: center;
        margin-top: 32px;
    }

    form {
        display: flex;
        flex-flow: column wrap;
        width: 40vw;
        max-width: 500px;

        h2 {
            font-size: 1.44rem;
        }

        button { 
            margin: 3rem 0 1.38rem;
        }

        .input {
            input::placeholder {
                text-align: start;
            }
        }
    }
</style>
