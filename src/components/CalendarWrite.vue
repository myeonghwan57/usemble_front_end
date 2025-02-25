<template>
    <div class="CalendarWrite">
        <vc-date-picker
            v-model="selectedDate"
            mode="dateTime"
            expanded
            is-required
            :initial-page="{ month: month, year: year }"
            is24hr
            showTime
            @update:model-value="handleDateSelected"
            :disabled-dates="disabledDates"
        ></vc-date-picker>
    </div>
</template>
<script setup>
import "v-calendar/style.css";
import { ref } from "vue";

const selectedDate = ref(null);

const emit = defineEmits(["dateSelected"]);

function handleDateSelected(newDate) {
    selectedDate.value = newDate;
    emit("dateSelected", newDate);
}

let today = new Date();
let month = today.getMonth() + 1;
let year = today.getFullYear();
let endDate = new Date(today);
endDate.setDate(today.getDate() + 1);
const disabledDates = ref([
    {
        start: null,
        end: endDate,
    },
]);
</script>
<style>
.CalendarWrite .vc-day {
    font-weight: bold;
    color: black;
}
.CalendarWrite .vc-container .vc-weekday-1,
.CalendarWrite .vc-container .vc-weekday-7 {
    color: red;
}

.CalendarWrite .vc-title span {
    background-color: #fff;
}
.CalendarWrite .vc-title {
    background-color: #fff;
}
.CalendarWrite .vc-arrow {
    background-color: #fff;
}
.CalendarWrite .vc-time-header {
    margin-top: 8px;
}
.CalendarWrite .vc-time-header span {
    font-size: 20px;
    margin-bottom: 8px;
}
.CalendarWrite .vc-time-select-group {
    background-color: #fff;
    font-size: 30px;
}
</style>
