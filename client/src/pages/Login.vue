<script setup>
    import { Field, Form, ErrorMessage } from 'vee-validate'
    import { reactive } from 'vue'
    import { useRouter } from 'vue-router';
    import * as yup from 'yup'
    import { loginAPI } from '../Api/AuthAPI'
    import { auth } from '../main.js'

    const router = useRouter()
    const userLogin = reactive({ username: "", password: "" })

    const formLoginValidation = yup.object().shape({
        username: yup.string().required("The username must have a value."),
        password: yup.string().required("The password must have a value.")
    })

    const  handleLogin = async () => {
        await loginAPI(userLogin)
        if(auth.token){
            router.push({name: 'home-page'})
        }
    }

</script>

<template>
<div>
    <Form @submit="handleLogin()" :validation-schema="formLoginValidation" class="mt-[150px] flex bg-white rounded-lg shadow-2xl overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
        <div class="hidden lg:block lg:w-1/2 bg-cover animate__slideInLeft animate__animated"
            style="background-image:url('https://res.cloudinary.com/dykgq5bav/image/upload/v1668917211/P-Social%20Network/bsnod0wi3emzi7atvi17.avif')">
        </div>
        <div class="w-full p-8 lg:w-1/2 animate__slideInRight animate__animated" >
            <h2 class="text-2xl font-semibold  text-center animate__animated animate__bounce">TSocial NetIn</h2>
            <p class="mt-2 text-sm text-gray-600 text-center"> >-- Welcome back --> </p>
            <div class="mt-4">
                <label class="lableField">Username</label>
                <Field class="inputField"
                    name="username" v-model="userLogin.username" />
                <ErrorMessage class="text-red-500 text-[13px]" name="username" />
            </div>
            <div class="mt-4">
                <div class="flex justify-between">
                    <label class="lableField">Password</label>
                </div>
                <Field
                    class="inputField"
                    name="password" v-model="userLogin.password" type="password"/>
                <ErrorMessage class="text-red-500 text-[13px]" name="password" />
            </div>
            <div class="mt-7">
                <button
                    class="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Login</button>
            </div>  
            <div class="mt-5 flex items-center justify-between">
                <span class="border-b w-1/5 md:w-1/4"></span>
                <router-link :to="{name: 'register-page'}" class="text-xs text-gray-500 uppercase hover:text-red-500 hover:text-[15px]">
                    or sign up
                </router-link>
                <span class="border-b w-1/5 md:w-1/4"></span>
            </div>
        </div>
    </Form>
</div>
</template>

<style>
</style>