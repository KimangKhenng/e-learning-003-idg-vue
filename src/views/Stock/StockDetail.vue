<template>
    <div class="space-y-4 max-w-xl mx-auto mt-8">
        <h1 class="text-2xl font-bold text-gray-800">Stock Detail</h1>

        <div v-if="loading" class="text-gray-500">Loading...</div>
        <div v-else-if="error" class="text-red-600">{{ error }}</div>

        <div v-else class="bg-white shadow rounded p-4 border border-gray-200 space-y-3">
            <div>
                <label class="block text-sm font-medium">Name</label>
                <input v-model="form.name" :readonly="!isEditing" class="w-full border rounded px-3 py-1 mt-1" />
            </div>

            <div>
                <label class="block text-sm font-medium">Quantity</label>
                <input type="number" v-model.number="form.quantity" :readonly="!isEditing"
                    class="w-full border rounded px-3 py-1 mt-1" />
            </div>

            <div>
                <label class="block text-sm font-medium">Price ($)</label>
                <input type="number" step="0.01" v-model.number="form.price" :readonly="!isEditing"
                    class="w-full border rounded px-3 py-1 mt-1" />
            </div>

            <!-- <p class="text-sm text-gray-500">
                <strong>Added by:</strong> {{ stock.byUser?.name || 'Unknown' }}
            </p> -->

            <div class="flex gap-4 mt-4">
                <button v-if="!isEditing" @click="isEditing = true"
                    class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Edit
                </button>

                <template v-else>
                    <button @click="saveChanges" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Save
                    </button>
                    <button @click="cancelEdit" class="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400">
                        Cancel
                    </button>
                </template>

                <button @click="deleteStock" class="ml-auto px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            stock: null,
            form: {
                name: '',
                quantity: 0,
                price: 0
            },
            isEditing: false,
            loading: false,
            error: null
        }
    },
    async mounted() {
        await this.fetchStock()
    },
    methods: {
        async fetchStock() {
            this.loading = true
            this.error = null
            const token = localStorage.getItem('token')
            try {
                const res = await axios.get(`http://localhost:3000/api/stocks/${this.$route.params.id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                this.stock = res.data
                this.form = {
                    name: res.data.name,
                    quantity: res.data.quantity,
                    price: res.data.price
                }
            } catch (err) {
                this.error = 'Failed to load stock.'
                console.error(err)
            } finally {
                this.loading = false
            }
        },
        async saveChanges() {
            const token = localStorage.getItem('token')
            try {
                const res = await axios.patch(
                    `http://localhost:3000/api/stocks/${this.$route.params.id}`,
                    this.form,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                )
                this.stock = res.data
                this.isEditing = false
                alert('Stock updated successfully.')
            } catch (err) {
                alert('Failed to update stock.')
                console.error(err)
            }
        },
        cancelEdit() {
            // Reset form to original data
            this.form = {
                name: this.stock.name,
                quantity: this.stock.quantity,
                price: this.stock.price
            }
            this.isEditing = false
        },
        async deleteStock() {
            const confirmDelete = confirm('Are you sure you want to delete this stock?')
            if (!confirmDelete) return

            const token = localStorage.getItem('token')
            try {
                await axios.delete(`http://localhost:3000/api/stocks/${this.$route.params.id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                alert('Stock deleted successfully.')
                this.$router.push('/stocks')
            } catch (err) {
                alert('Failed to delete stock.')
                console.error(err)
            }
        }
    }
}
</script>
