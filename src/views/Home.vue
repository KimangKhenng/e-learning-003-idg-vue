<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
        <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
            <h2 class="text-3xl font-bold text-indigo-700 text-center mb-2">Welcome Back</h2>
            <p class="text-sm text-gray-600 text-center mb-6">
                <span class="font-semibold">Demo Username:</span> <code class="text-pink-600">demo</code><br />
                <span class="font-semibold">Demo Password:</span> <code class="text-pink-600">password123</code>
            </p>

            <form @submit.prevent="handleLogin" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Username</label>
                    <input v-model="username" type="text"
                        class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none"
                        required />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="password" type="password"
                        class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none"
                        required />
                </div>
                <router-link to="/sign-up">
                    <button
                        class="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:from-indigo-600 hover:to-pink-600 transition">
                        Sign Up
                    </button>
                </router-link>


                <button type="submit"
                    class="mt-5 w-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-2 rounded-lg font-semibold hover:from-indigo-600 hover:to-pink-600 transition">
                    Login
                </button>

                <p v-if="error" class="text-red-600 text-sm text-center mt-2">{{ error }}</p>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: '',
            error: ''
        }
    },
    methods: {
        async handleLogin() {
            // const demoUser = 'demo'
            // const demoPass = 'password123'

            // if (this.username === demoUser && this.password === demoPass) {
            //     this.$router.push('/dashboard')
            // } else {
            //     this.error = 'Invalid username or password'
            // }
            const response = await axios.post('http://localhost:3000/api/auth/login', {
                username: this.username,
                password: this.password
            })
            console.log(response.data)
            localStorage.setItem('token', response.data.accessToken)
            if (response.data.accessToken) {
                this.$router.push('/dashboard')
            }
        }
    }
}
</script>
