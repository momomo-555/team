<template>
    <div class="login">
        <MainLogin></MainLogin>
    </div>
</template>

<script>
import MainLogin from '@/components/Login/MainLogin'
export default {
    name: 'Login',
    components: { MainLogin },
};
</script>

<style scoped>
html,
body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    overflow: hidden;
}

.login {
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: #313131;
    overflow-y: auto;
}
</style>