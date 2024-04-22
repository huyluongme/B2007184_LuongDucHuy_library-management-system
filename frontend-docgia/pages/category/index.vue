<template>
    <div style="margin-bottom: 70px;">
        <v-app-bar app color="secondary" dark>
            <!-- <v-btn :href="`/books/listed`">Manage Books</v-btn> -->
            <VBtn :href="`/books`">QUẢN LÝ SÁCH</VBtn>
            <VBtn :href="`/category`">QUẢN LÝ THỂ LOẠI</VBtn>
            <VBtn :href="`/publisher`">QUẢN LÝ NHÀ XUẤT BẢN</VBtn>
            <!-- <v-btn text @click="navigate('manage-categories')">Manage Categories</v-btn>
              <v-btn text @click="navigate('manage-publishers')">Manage Publishers</v-btn> -->
        </v-app-bar>
    </div>
    <v-card flat>
        <v-card-title class="d-flex align-center pe-2">
            <v-icon icon="mdi-shape-plus"></v-icon> &nbsp;
            Danh sách thể loại
        </v-card-title>
        <v-card-title class="d-flex align-center pe-2">
            <VBtn style="margin-left: 10px; margin-bottom: 10px;" color="secondary" icon="mdi-plus" elevation="10"
                @click="openCreateDialog"></VBtn>
            <v-spacer></v-spacer>
            <v-text-field v-model="search" density="compact" label="Tìm kiếm" prepend-inner-icon="mdi-magnify"
                variant="solo-filled" flat hide-details single-line></v-text-field>
        </v-card-title>

        <v-divider></v-divider>
        <v-data-table :headers="headers" v-model:search="search" :items="items" hover="true">
            <template v-slot:item.index="{ index }">
                <span>{{ index + 1 }}</span> <!-- Adding 1 because index starts at 0 -->
            </template>
            <template v-slot:item.actions="{ item }">

                <v-btn elevation="10" size="small" icon @click="openDialog(item)" style="margin-right: 8px;">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn elevation="10" size="small" icon color="red" @click="openDeleteDialog(item)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>

        </v-data-table>
    </v-card>
    <v-dialog v-model="createDialog" max-width="600px">
        <v-card>
            <v-card-title>
                Tạo thể loại mới
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="newItem.MATHELOAI" label="Mã thể loại" required></v-text-field>
                    <v-text-field v-model="newItem.TENTHELOAI" label="Tên thể loại" required></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeCreateDialog">Hủy</v-btn>
                <v-btn color="blue darken-1" text @click="createCategory">Tạo</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title>
                Chỉnh sửa thể loại
            </v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field v-model="editedItem.MATHELOAI" label="Mã thể loại"></v-text-field>
                    <v-text-field v-model="editedItem.TENTHELOAI" label="Tên thể loại"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialog">Hủy</v-btn>
                <v-btn color="blue darken-1" text @click="saveItem">Lưu</v-btn>
            </v-card-actions>
        </v-card>
        <!-- <VSonner /> -->
    </v-dialog>

    <v-dialog v-model="deleteDialog" persistent max-width="400px">
        <v-card>
            <v-card-title class="headline">Xác nhận xóa thể loại</v-card-title>
            <v-card-text>
                Bạn có chắc muốn xóa thể loại này? Hành động này sẽ không thể hoàn tác.
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteDialog">Hủy</v-btn>
                <v-btn color="red darken-1" text @click="confirmDelete">Xóa</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
import categoryService from '~/services/category.service';
// import { VSonner, toast } from 'vuetify-sonner'
import 'vuetify-sonner/style.css'
interface Category {
    _id: string,
    MATHELOAI: string,
    TENTHELOAI: string,
}
export default defineComponent({
    data() {
        return {
            search: '',
            items: [] as Category[],
            dialog: false,
            createDialog: false,
            deleteDialog: false,
            editedItem: {} as Category,
            newItem: {} as Category,
            headers: [
                { title: 'STT', value: 'index', width: '50px' },
                { key: 'MATHELOAI', title: 'Mã thể loại', width: '150px' },
                { key: 'TENTHELOAI', title: 'Tên thể loại', width: '1500px' },
                { key: 'actions', title: 'Hành động', align: 'center' }, // Thêm dòng này
            ],
        }
    },

    methods: {
        openCreateDialog() {
            this.newItem = { MATHELOAI: '', TENTHELOAI: '' }; // Reset the form
            this.createDialog = true;
        },
        closeCreateDialog() {
            this.createDialog = false;
        },
        async createCategory() {
            if (this.newItem.MATHELOAI && this.newItem.TENTHELOAI) {
                await categoryService.createCategory(this.newItem.MATHELOAI, this.newItem.TENTHELOAI);
                this.closeCreateDialog();
                this.items = await categoryService.getAllCategory(); // Refresh the list
            } else {
                alert("All fields are required."); // Simple validation feedback
            }
        },
        openDialog(item: Category) {
            this.editedItem = { ...item };
            this.dialog = true;
        },
        closeDialog() {
            this.dialog = false;
        },

        async saveItem() {
            const res = await categoryService.updateCategory(this.editedItem);
            // // @ts-expect-error
            // toast(res.message, {
            //   cardProps: {
            //     color: 'success',
            //     class: 'my-toast',
            //   },
            //   prependIcon: 'mdi-check-circle-outline',
            // })
            this.items = await categoryService.getAllCategory(); // Refresh list
            this.closeDialog();
        },

        openDeleteDialog(item: Category) {
            this.currentItem = item;
            this.deleteDialog = true;
        },
        closeDeleteDialog() {
            this.deleteDialog = false;
        },
        async confirmDelete() {
            console.log("delete")
            await categoryService.deleteCategory(this.currentItem._id);
            this.closeDeleteDialog();
            this.items = await categoryService.getAllCategory(); // Refresh the list
        },
    },

    async mounted() {
        console.log("Hello")
        this.items = await categoryService.getAllCategory()
        console.log(this.items)
    }
});
</script>

<style scoped>
:deep() .v-table .v-table__wrapper>table>thead>tr>th:not(:last-child) {
    border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}

:deep() .v-table .v-table__wrapper>table>tbody>tr>td:not(:last-child),
.v-table .v-table__wrapper>table>tbody>tr>th:not(:last-child) {
    border-right: thin solid rgba(var(--v-border-color), var(--v-border-opacity));
}
</style>