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
        <v-container>
            <VBtn style="margin-bottom: 20px;" color="secondary" icon="mdi-plus" elevation="10" :href="`/books/create`"></VBtn>
            <v-row>
                <v-col v-for="book in listBook" :key="book._id" cols="12" sm="4" md="3" lg="2">
                    <v-card style="padding: 10px; height: 400px;" elevation="10">
                        <div style="position: absolute; top: 20px; right: 20px; display: flex; gap: 10px;">
                            <VBtn elevation="20"  icon="mdi-pencil" size="small" :href="`/books/${book._id}/edit`"></VBtn>
                            <VBtn elevation="20" color="red" icon="mdi-delete" size="small" :href="`/books/${book._id}/delete`"></VBtn>
                        </div>
                        <!-- Sử dụng thuộc tính imageURL mới -->
                        <img :src="uploadService.getFileUrl(book.HINHANH)"
                            style="object-fit: cover; display: block; width: 100%; height:90%;"></img>
                        <v-card-title style="font-weight: 700;">{{ book.TENSACH }}</v-card-title>
                        <!-- <v-card-text>{{ book.MOTA }}</v-card-text> -->
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script setup lang="ts">
import bookService from '~/services/book.service';
import uploadService from '~/services/upload.service';
// import { useUserStore } from '~/store/user';
// const route = useRouter()
// const user = useUserStore()

// if(user.user == null){
//     route.push({
//         path: "/login"
//     })
// }
const listBook = await bookService.listAllBooks()
console.log(listBook)
</script>