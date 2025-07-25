<template>
    <div class="min-h-screen flex bg-gray-50">
        <!-- Sidebar -->
        <aside class="w-64 bg-white shadow-lg p-6 flex flex-col justify-between">
            <div>
                <h2 class="text-xl font-bold text-indigo-600 mb-6">My Admin</h2>
                <nav class="space-y-2">
                    <RouterLink v-for="link in links" :key="link.name" :to="link.to"
                        class="block px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-100"
                        :class="{ 'bg-indigo-100 text-indigo-700 font-semibold': isActive(link.to) }">
                        {{ link.name }}
                    </RouterLink>
                </nav>
            </div>

            <!-- Logout -->
            <button @click="handleLogout"
                class="mt-8 px-4 py-2 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition">
                Logout
            </button>
        </aside>

        <!-- Main Content -->
        <main class="flex-1 p-8">
            <router-view />
        </main>
    </div>
</template>

<script>
export default {
    name: 'DashboardLayout',
    data() {
        return {
            links: [
                { name: 'Dashboard', to: '/dashboard' },
                { name: 'Users', to: '/users' },
                { name: 'Teachers', to: '/teachers' },
                { name: 'Stocks', to: '/stocks' },
                { name: 'Courses', to: '/courses' }
            ]
        }
    },
    methods: {
        isActive(route) {
            return this.$route.path === route
        },
        handleLogout() {
            // Simulate logout: clear session and redirect to login
            // You can clear tokens or localStorage here if needed
            this.$router.push('/')
        }
    }
}
</script>
