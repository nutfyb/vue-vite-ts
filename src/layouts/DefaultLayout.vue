<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer">
            <!--  -->
            <v-list>
                <v-list-item
                    prepend-avatar="https://scontent.fbkk12-5.fna.fbcdn.net/v/t1.6435-1/160131135_2883663398571799_5013629217426776484_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-7&_nc_sid=7206a8&_nc_ohc=6U5KMUIP6cgAX8wQGe3&tn=TVs821iEoVP6maAK&_nc_ht=scontent.fbkk12-5.fna&oh=00_AfC8hGA1BJvqt5vDEF_YCJvIFDS92oVX0zdiyO37eMW5zQ&oe=63C22FEA"
                    title="Nut" subtitle="nut@hotmail.com" class="pa-md-10">
                    <template v-slot:append>
                        <v-btn size="small" variant="text" icon="mdi-menu-down"></v-btn>
                    </template>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>
            <v-list nav>
                <v-list-item prepend-icon="mdi-view-dashboard" value="dashboard" to="/dashboard">{{ t('menu_dashboard') }}</v-list-item>
                <v-list-item prepend-icon="mdi-store" value="product" to="/product">{{ t('menu_product') }}</v-list-item>
                <v-list-item prepend-icon="mdi-cart" value="order" to="/order">{{ t('menu_order') }}</v-list-item>
                <v-list-item prepend-icon="mdi-chart-bar" value="report" to="/report">{{ t('menu_report') }}</v-list-item>
                <v-list-item prepend-icon="mdi-cog" value="setting" to="/setting">{{ t('menu_setting') }}</v-list-item>
            </v-list>

            <v-divider class="mt-16"></v-divider>
            <v-list nav>
                <v-list-item prepend-icon="mdi-logout" value="logout">{{ t('menu_logout') }}</v-list-item>
            </v-list>

        </v-navigation-drawer>

        <v-app-bar>
            <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

            <v-toolbar-title>{{ t(`${route.meta.header}`)}}</v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- Notification Count -->
            <v-btn class="text-none" stacked @click="clearCount">
                <v-badge v-if="count.total > 0" color="error" :content="count.total">
                    <v-icon>mdi-bell-outline</v-icon>
                </v-badge>
                    <v-icon v-if="count.total < 1">mdi-bell-outline</v-icon>
            </v-btn>
            <!-- End Notification Count -->

            <v-menu open-on-click>

                <template v-slot:activator="{ props }">
                    <v-btn v-bind="props">
                        {{ activeLang }}
                        <v-icon small right icon="mdi-menu-down" />
                    </v-btn>
                </template>

                <v-list dense>
                    <v-list-item v-for="(value, key) in langs" :key="key">
                        <v-btn block variant="plain" @click="handlemenuItemClick(key.toString())">{{ value }}</v-btn>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-btn class="ma-2" text prepend-icon="mdi-white-balance-sunny" @click="toggletheme()"
                v-if="!theme.global.current.value.dark">Light</v-btn>
            <v-btn class="ma-2" text prepend-icon="mdi-moon-waning-crescent" @click="toggletheme()"
                v-if="theme.global.current.value.dark">Dark</v-btn>

        </v-app-bar>

        <v-main>
            <!--  -->
            <!-- <div class="pa-md-8">
            <h1>{{ t(`${route.meta.header}`)}}</h1> -->
            <router-view />
        <!-- </div> -->
        </v-main>
    </v-app>
</template>
  
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { db } from '../plugins/firebase'
import  router  from '../router/index'

const count: any = ref(0)

// Fecth Product Count
onMounted(() => {
    db.collection("product_counts")
    .onSnapshot((querySnapshot) => {
        count.value = querySnapshot.docs[0].data()
        // console.log(count.value.total);
    })
})

// Clear count total
const clearCount = () => {
    // Push to product page
    router.push('/product')

    // update total  count in firebase
    db.collection("product_counts")
    .doc('p_count')
    .update({
        total: 0
    })
}

// Get meta router
const route = useRoute()

// console.log(route.meta.header)


// Toggole Drawer
const drawer = ref(true)
// Toggle Theme
const theme: any = useTheme()
const toggletheme = () => {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    // set to localStorage theme
    localStorage.setItem('theme_store', theme.global.name.value)
}
// get theme from localStorage
if (localStorage.getItem('theme_store') != null) {
    theme.global.name.value = localStorage.getItem('theme_store')?.toString()
}
else {
    theme.global.name.value = 'light'
}

// use i18n
let { t, locale } = useI18n({
    inheritLocale: true,
    useScope: 'global'
})

// console.log(locale.value)

// switch multi language
const langs: any = {
    'en': 'English',
    'th': 'ไทย',
    'la': 'ລາວ',
    'kr': '한국어'
}

// toggle language
let activeLang = ref(langs[`${locale.value}`])
function handlemenuItemClick(lang: string) {
    activeLang.value = langs[lang]
    // console.log(lang)
    // console.log(activeLang.value)

    // set new locale
    locale.value = lang

    // set language to localStorage
    localStorage.setItem('lang_store', lang)
}

// const handlemenuItemClick=()=> {

// }
</script>