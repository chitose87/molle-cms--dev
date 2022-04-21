<template lang="pug">
TasksList
</template>

<script lang="ts">
import {Component, Vue} from "nuxt-property-decorator";
import TasksList from "~/molle-cms/src/ui/tasks/TasksList.vue";

@Component({
  components: {TasksList},
})
export default class Index extends Vue {

}
</script>

<style lang="scss">
</style>
