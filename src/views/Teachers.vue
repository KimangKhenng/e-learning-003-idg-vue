<template>
    <div class="space-y-6">
        <h1 class="text-2xl font-bold text-gray-800">Teachers</h1>

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
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                    Prev
                </button>
                <span class="text-sm">Page {{ pagination.page }} of {{ pagination.totalPages }}</span>
                <button @click="nextPage" :disabled="!pagination.hasNextPage"
                    class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50">
                    Next
                </button>
            </div>
        </div>

        <!-- Teacher Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200 rounded shadow">
                <thead class="bg-indigo-100">
                    <tr>
                        <th class="text-left p-2 border-b">Name</th>
                        <th class="text-left p-2 border-b">Subject</th>
                        <th class="text-left p-2 border-b">Experience (yrs)</th>
                        <th class="text-left p-2 border-b">Courses</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="teacher in teachers" :key="teacher._id" class="hover:bg-gray-50">
                        <td class="p-2 border-b">{{ teacher.name }}</td>
                        <td class="p-2 border-b">{{ teacher.subject }}</td>
                        <td class="p-2 border-b">{{ teacher.yearsOfExperience }}</td>
                        <td class="p-2 border-b">{{ teacher.courses.length }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Teachers',
    data() {
        return {
            teachers: [],
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
        this.fetchTeachers()
    },
    methods: {
        async fetchTeachers() {
            const token = localStorage.getItem('token')
            try {
                const { data } = await axios.get('http://localhost:3000/api/teachers', {
                    params: { page: this.page, limit: this.limit },
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                this.teachers = data.docs
                this.pagination = {
                    page: data.page,
                    totalPages: data.totalPages,
                    hasNextPage: data.hasNextPage,
                    hasPrevPage: data.hasPrevPage
                }
            } catch (error) {
                console.error('Failed to fetch teachers:', error)
            }
        },
        nextPage() {
            if (this.pagination.hasNextPage) {
                this.page++
                this.fetchTeachers()
            }
        },
        prevPage() {
            if (this.pagination.hasPrevPage) {
                this.page--
                this.fetchTeachers()
            }
        },
        onLimitChange() {
            this.page = 1 // reset page
            this.fetchTeachers()
        }
    }
}
</script>
