<template>
    <div class="space-y-6">
        <h1 class="text-2xl font-bold text-gray-800">Users</h1>

        <!-- Pagination Controls -->
        <div class="flex justify-between items-center">
            <div>
                <label class="text-sm font-medium mr-2">Items per page:</label>
                <select v-model.number="limit" @change="onLimitChange" class="border rounded px-2 py-1">
                    <option :value="5">5</option>
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                </select>
            </div>

            <div class="space-x-2">
                <button @click="prevPage" :disabled="!pagination.hasPrevPage"
                    class="px-3 py-1 bg-pink-200 rounded hover:bg-pink-300 disabled:opacity-50">
                    Prev
                </button>
                <span class="text-sm">Page {{ pagination.page }} of {{ pagination.totalPages }}</span>
                <button @click="nextPage" :disabled="!pagination.hasNextPage"
                    class="px-3 py-1 bg-indigo-200 rounded hover:bg-indigo-300 disabled:opacity-50">
                    Next
                </button>
            </div>
        </div>

        <!-- Users Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200 rounded shadow">
                <thead class="bg-indigo-100">
                    <tr>
                        <th class="text-left p-2 border-b">Name</th>
                        <th class="text-left p-2 border-b">Username</th>
                        <th class="text-left p-2 border-b">Email</th>
                        <th class="text-left p-2 border-b">Age</th>
                        <th class="text-left p-2 border-b">Role</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users" :key="user._id" class="hover:bg-gray-50">
                        <td class="p-2 border-b">{{ user.name }}</td>
                        <td class="p-2 border-b">{{ user.username }}</td>
                        <td class="p-2 border-b">{{ user.email }}</td>
                        <td class="p-2 border-b">{{ user.age }}</td>
                        <td class="p-2 border-b capitalize">
                            <span :class="[
                                'px-2 py-1 rounded text-xs font-semibold',
                                user.role === 'admin' ? 'bg-red-100 text-red-700' :
                                    user.role === 'editor' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-green-100 text-green-800'
                            ]">
                                {{ user.role }}
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Users',
    data() {
        return {
            users: [],
            page: 1,
            limit: 10,
            pagination: {
                page: 1,
                totalPages: 1,
                hasNextPage: false,
                hasPrevPage: false
            }
        }
    },
    mounted() {
        this.fetchUsers()
    },
    methods: {
        async fetchUsers() {
            const token = localStorage.getItem('token')
            try {
                const { data } = await axios.get('http://localhost:3000/api/users', {
                    params: { page: this.page, limit: this.limit },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                this.users = data.docs
                this.pagination = {
                    page: data.page,
                    totalPages: data.totalPages,
                    hasNextPage: data.hasNextPage,
                    hasPrevPage: data.hasPrevPage
                }
            } catch (error) {
                console.error('Error fetching users:', error)
            }
        },
        nextPage() {
            if (this.pagination.hasNextPage) {
                this.page++
                this.fetchUsers()
            }
        },
        prevPage() {
            if (this.pagination.hasPrevPage) {
                this.page--
                this.fetchUsers()
            }
        },
        onLimitChange() {
            this.page = 1
            this.fetchUsers()
        }
    }
}
</script>
