<template>
    <div class="CalendarRead">
        <vc-date-picker
            color="white"
            v-model="today"
            is-required
            :initial-page="{ month: month, year: year }"
            :disabled-dates="disabledDates"
            :masks="{
                title: 'YYYY/MM',
            }"
        >
        </vc-date-picker>
    </div>
</template>

<script setup>
import { ref } from "vue";
import "v-calendar/style.css";

const props = defineProps(["sstartDate"]);
let today = new Date(props.sstartDate);
let month = today.getMonth() + 1;
let year = today.getFullYear();

let endDate = new Date(props.sstartDate);
endDate.setDate(today.getDate() - 1);
let startDate = new Date(props.sstartDate);
startDate.setDate(today.getDate() + 1);
const disabledDates = ref([
    {
        start: null,
        end: endDate,
    },
    {
        start: startDate,
        end: null,
    },
]);
</script>

<style>
.CalendarRead .vc-day {
    font-weight: bold;
    color: black;
}

.CalendarRead .vc-container {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
}
.CalendarRead .vc-container .vc-weekday-1,
.CalendarRead .vc-container .vc-weekday-7 {
    color: red;
}

.CalendarRead .vc-title span {
    background-color: #fff;
}
.CalendarRead .vc-title {
    background-color: #fff;
}
.CalendarRead .vc-arrow {
    background-color: #fff;
}
.CalendarRead .vc-highlights {
    background-color: #558ccf;
    border-radius: 50%;
}
.CalendarRead .vc-time-header {
    margin-top: 8px;
}
.CalendarRead .vc-time-header span {
    font-size: 20px;
}
.CalendarRead .vc-time-select-group {
    display: none;
}
.CalendarRead .vc-highlight-content-solid .vc-white {
    color: black;
}
</style>
