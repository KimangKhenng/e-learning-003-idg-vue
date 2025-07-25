<template>
    <div
        class="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
        <div class="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
            <h2 class="text-3xl font-bold text-indigo-700 text-center mb-4">Create Account</h2>

            <form @submit.prevent="handleSignup" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700">Full Name</label>
                    <input v-model="name" type="text" required
                        class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Username</label>
                    <input v-model="username" type="text" required
                        class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Email</label>
                    <input v-model="email" type="email" required
                        class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Age</label>
                    <input v-model="age" type="number" min="1" required
                        class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Role</label>
                    <input v-model="role" type="text" required
                        class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-300 focus:outline-none" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700">Password</label>
                    <input v-model="password" type="password" required
                        class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-300 focus:outline-none" />
                </div>

                <button type="submit"
                    class="w-full bg-gradient-to-r from-pink-500 to-indigo-500 text-white py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-indigo-600 transition">
                    Sign Up
                </button>
            </form>

            <p class="text-sm text-center mt-4 text-gray-600">
                Already have an account?
                <router-link to="/" class="text-indigo-600 font-medium hover:underline">Login here</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            name: '',
            username: '',
            email: '',
            age: '',
            role: '',
            password: '',
        }
    },
    methods: {
        async handleSignup() {
            try {
                const res = await axios.post('http://localhost:3000/api/auth/sign-up', {
                    name: this.name,
                    username: this.username,
                    email: this.email,
                    age: this.age,
                    role: this.role,
                    password: this.password
                })

                // Toast success
                alert('Account created successfully. Please login.')
                this.$router.push('/')
            } catch (err) {
                const msg = err.response?.data?.message || 'Sign up failed'
                alert(msg) // Replace with this.$toast.error(msg) if using Toastification
            }
        }
    }
}
</script>
