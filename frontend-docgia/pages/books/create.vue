<template>
    <div style="margin-bottom: 60px;">
        <v-app-bar app color="secondary" dark>
            <!-- <v-btn :href="`/books/listed`">Manage Books</v-btn> -->
            <VBtn :href="`/books/listed`">Manage Books</VBtn>
            <!-- <v-btn text @click="navigate('manage-categories')">Manage Categories</v-btn>
            <v-btn text @click="navigate('manage-publishers')">Manage Publishers</v-btn> -->
        </v-app-bar>
    </div>
    <div>
        <VForm class="create-book-form" @submit="createBook">
            <VImg class="mx-auto my-6" max-width="128" src="/assets/logo.png"></VImg>
            <VCard class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
                <div class="text-subtitle-1 text-medium-emphasis">Tên sách</div>

                <VTextField v-model="TENSACH" density="compact" placeholder="Nhập tên sách"
                    prepend-inner-icon="mdi-book-outline" variant="outlined">

                </VTextField>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Thể loại
                </div>

                <VSelect v-model="THELOAI" density="compact" placeholder="Chọn thể loại" :items=listCategoryName
                    prepend-inner-icon="mdi-shape-plus-outline" variant="outlined">

                </VSelect>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Đơn giá
                </div>

                <VTextField v-model="DONGIA" type="number" density="compact" placeholder="Nhập đơn giá"
                    prepend-inner-icon="mdi-cash" variant="outlined">

                </VTextField>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Số quyển
                </div>

                <VTextField v-model="SOQUYEN" type="number" density="compact" placeholder="Nhập số quyển"
                    prepend-inner-icon="mdi-counter" variant="outlined">

                </VTextField>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Năm xuất bản
                </div>

                <VTextField v-model="NAMXUATBAN" type="number" density="compact" placeholder="Nhập năm xuất bản"
                    prepend-inner-icon="mdi-calendar-blank-outline" variant="outlined">

                </VTextField>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Nhà xuất bản
                </div>

                <VSelect v-model="NHAXUATBAN" density="compact" placeholder="Chọn nhà xuất bản" :items=listPublisherName
                    prepend-inner-icon="mdi-publish" variant="outlined">

                </VSelect>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Tác giả
                </div>

                <VTextField v-model="TACGIA" density="compact" placeholder="Nhập tên tác giả"
                    prepend-inner-icon="mdi-account-outline" variant="outlined">

                </VTextField>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Mô tả
                </div>

                <VTextarea v-model="MOTA" density="compact" placeholder="Nhập mô tả sách"
                    prepend-inner-icon="mdi-details" variant="outlined">

                </VTextarea>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
                    Hình ảnh minh họa
                </div>

                <VFileInput v-model="HINHANH" density="compact" placeholder="Chọn hình ảnh minh họa"
                    prepend-inner-icon="mdi-image-outline" variant="outlined">

                </VFileInput>

                <VBtn block class="mb-8" color="blue" size="large" variant="tonal" type="submit">
                    Thêm sách
                </VBtn>

                <VSonner />
            </VCard>
            <!-- <VSonner /> -->
        </VForm>
    </div>
</template>

<script setup lang="ts">
import bookService from '~/services/book.service';
import CategoryService from '~/services/category.service';
import PublisherService from '~/services/publisher.service';
import { VSonner, toast } from 'vuetify-sonner'
import 'vuetify-sonner/style.css'
import uploadService from '~/services/upload.service';
const listCategory = await CategoryService.getAllCategory()
console.log(listCategory)
const listCategoryName = listCategory.map(category => category.TENTHELOAI)
console.log(listCategoryName)
const listPublisher = await PublisherService.getAllPublisher()
const listPublisherName = listPublisher.map(publisher => publisher.TENNXB)
console.log(listPublisher)
const TENSACH = ref("")
const THELOAI = ref("")
const DONGIA = ref()
const SOQUYEN = ref()
const NAMXUATBAN = ref()
const NHAXUATBAN = ref("")
const TACGIA = ref("")
const MOTA = ref("")
const HINHANH = ref()
var HINHANH_STORE = ""



async function createBook(event: Event) {
    event.preventDefault()
    try {
        if (TENSACH.value == "" || THELOAI.value == "" || DONGIA.value == null
            || SOQUYEN.value == null || NAMXUATBAN.value == null || NHAXUATBAN.value == ""
            || TACGIA.value == "" || MOTA.value == "" || HINHANH.value == null
        ) {
            // @ts-expect-error
            toast("Vui lòng nhập đủ các thông tin", {
                cardProps: {
                    color: 'error',
                    class: 'my-toast',
                },
                prependIcon: 'mdi-alert-circle-outline',
            })
            return
        }
        const file = await uploadService.uploadImage(HINHANH.value[0])
        const category = listCategory.find(category => category.TENTHELOAI === THELOAI.value);
        const publisher = listPublisher.find(publisher => publisher.TENNXB === NHAXUATBAN.value);
        if (category && publisher) {
            const res = await bookService.createBook(
                TENSACH.value,
                category._id,
                DONGIA.value,
                SOQUYEN.value,
                NAMXUATBAN.value,
                publisher._id,
                TACGIA.value,
                MOTA.value,
                file.filename
            )
            // @ts-expect-error
            toast(res.message, {
                cardProps: {
                    color: 'success',
                    class: 'my-toast',
                },
                prependIcon: 'mdi-check-circle-outline',
            })

        }
    } catch (error: any) {

    }
}
</script>
