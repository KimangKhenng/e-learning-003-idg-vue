<template>
    <div class="space-y-6">
        <h1 class="text-2xl font-bold text-gray-800">Courses</h1>

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

        <!-- Course Table -->
        <div v-if="loading" class="text-gray-500">Loading courses...</div>
        <div v-else-if="error" class="text-red-600">Error loading courses: {{ error }}</div>

        <div v-else class="overflow-x-auto">
            <table class="min-w-full bg-white border border-gray-200 rounded shadow text-sm">
                <thead class="bg-indigo-100">
                    <tr>
                        <th class="text-left p-2 border-b">Title</th>
                        <th class="text-left p-2 border-b">Credit</th>
                        <th class="text-left p-2 border-b">Description</th>
                        <th class="text-left p-2 border-b">Teachers</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="course in courses" :key="course._id" class="hover:bg-gray-50">
                        <td class="p-2 border-b">{{ course.title }}</td>
                        <td class="p-2 border-b">{{ course.credit }}</td>
                        <td class="p-2 border-b text-gray-700">{{ course.description }}</td>
                        <td class="p-2 border-b text-xs text-gray-500">
                            <ul>
                                <li v-for="(teacher, index) in course.taughtBy" :key="index">
                                    {{ teacher.name }}
                                </li>
                            </ul>
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
    name: 'CoursesView',
    data() {
        return {
            courses: [],
            loading: false,
            error: null,
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
        this.fetchCourses()
    },
    methods: {
        async fetchCourses() {
            this.loading = true
            this.error = null
            try {
                const res = await axios.get('http://localhost:3000/api/courses', {
                    params: { page: this.page, limit: this.limit, populate: 'taughtBy' }
                })
                this.courses = res.data.docs
                this.pagination = {
                    page: res.data.page,
                    totalPages: res.data.totalPages,
                    hasNextPage: res.data.hasNextPage,
                    hasPrevPage: res.data.hasPrevPage
                }
            } catch (err) {
                this.error = err.message || 'Failed to fetch courses.'
            } finally {
                this.loading = false
            }
        },
        nextPage() {
            if (this.pagination.hasNextPage) {
                this.page++
                this.fetchCourses()
            }
        },
        prevPage() {
            if (this.pagination.hasPrevPage) {
                this.page--
                this.fetchCourses()
            }
        },
        onLimitChange() {
            this.page = 1
            this.fetchCourses()
        }
    }
}
</script>

<!-- <style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style> -->
