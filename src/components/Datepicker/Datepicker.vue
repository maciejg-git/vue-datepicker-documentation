<template>
  <div>
    <slot v-bind="slotProps"></slot>
  </div>
</template>

<script setup>
import {
  ref,
  provide,
  computed,
  defineProps,
  reactive,
  toRefs,
  watch,
} from "vue";

let props = defineProps({
  modelValue: {
    type: [Date, String, Array],
  },
  current: {
    type: [String, Array],
  },
  locale: {
    type: String,
    default: "",
  },
  mondayFirstWeekday: {
    type: Boolean,
    default: true,
  },
  todayFormat: {
    type: Object,
    default: () => ({
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  },
  rangeMode: {
    type: Boolean,
    default: false,
  },
  transitionName: {
    type: String,
    default: "fade",
  },
  autoEmit: {
    type: Boolean,
    default: true,
  },
  modelFormat: {
    type: String,
    default: "date",
  },
  minDate: {
    type: [Array, Date, String],
  },
  maxDate: {
    type: [Array, Date, String],
  },
  onDayClicked: {
    type: Function,
    default: undefined,
  },
  customVariants: {
    type: Object,
    default: {},
  },
  adjacentMonthsDays: {
    type: Boolean,
    default: true,
  },
});

let emit = defineEmits(["update:modelValue", "day-clicked", "update:current"]);

let getNumberRange = (from, count) => {
  return Array.from({ length: count }, (_, i) => i + from);
};

let pad = (d) => (d < 10 ? "0" + d : d);

let getCountDaysInMonth = (y, m) => 32 - new Date(y, m, 32).getDate();

let prevMonth = (m, y) => {
  return m - 1 < 0 ? { m: 11, y: y - 1 } : { m: m - 1, y };
};

let nextMonth = (m, y) => {
  return m + 1 > 11 ? { m: 0, y: y + 1 } : { m: m + 1, y };
};

let getFirstDay = (m, y) => {
  let d = new Date(m, y).getDay();
  return props.mondayFirstWeekday ? (6 + d) % 7 : d;
};

let parseDate = (d) => d.split("-").map((i) => +i);

let isDate = (d) => Object.prototype.toString.call(d) === "[object Date]";

let isMonthValid = (m) => typeof m === "number" && m <= 11 && m >= 0;

let isYearValid = (y) => typeof y === "number";

let locale = computed(() => {
  return props.locale || navigator?.language || "en-GB";
});

let names = {
  months: computed(() => {
    return Array.from({ length: 12 }, (v, i) =>
      new Date(0, i, 1).toLocaleString(locale.value, {
        month: "short",
      })
    );
  }),
  weekdays: computed(() =>
    Array.from({ length: 7 }, (v, i) =>
      new Date(2021, 1, props.mondayFirstWeekday ? i + 1 : i).toLocaleString(
        locale.value,
        {
          weekday: "short",
        }
      )
    )
  ),
};

let today = new Date();
today.setHours(0, 0, 0, 0);

let todayFormatted = computed(() =>
  today.toLocaleDateString(locale.value, props.todayFormat)
);

let current = reactive({
  month: today.getMonth(),
  year: today.getFullYear(),
});

let setNextMonth = () => {
  ({ m: current.month, y: current.year } = nextMonth(
    current.month,
    current.year
  ));
  emit("update:current", [current.month, current.year]);
};

let setPrevMonth = () => {
  ({ m: current.month, y: current.year } = prevMonth(
    current.month,
    current.year
  ));
  emit("update:current", [current.month, current.year]);
};

let setNextYear = () => ++current.year;

let setPrevYear = () => --current.year;

watch(
  () => props.current,
  (value) => {
    if (Array.isArray(value) && value.length === 2) {
      if (!isMonthValid(value[0]) || !isYearValid(value[1])) return;
      current.month = value[0];
      current.year = value[1];
      return;
    }
    if (typeof value === "string") {
      let c = value.split("-");
      if (c.length !== 2 || !isMonthValid(c[0]) || !isYearValid(c[1])) return;
      [current.month, current.year] = c;
    }
  },
  { immediate: true }
);

let modelValueToDate = (value) => {
  if (props.modelFormat === "date" && isDate(value)) {
    return new Date(value.getTime());
  }
  if (props.modelFormat === "array" && Array.isArray(value)) {
    return new Date(...value);
  }
  if (props.modelFormat === "string" && typeof value === "string") {
    let d = parseDate(value);
    d[1] = d[1] - 1;
    return new Date(...d);
  }
};

// add validation
watch(
  () => props.modelValue,
  () => {
    let m = props.modelValue;
    if (props.rangeMode) {
      let from = modelValueToDate(m[0]);
      let to = modelValueToDate(m[1]);
      if (from && to) {
        selectedRange.value[0] = from;
        selectedRange.value[1] = to;
      }
    } else {
      let d = modelValueToDate(m);
      if (d) selectedSingle.value = d;
    }
  }
);

let dateToModelValue = (value) => {
  if (props.modelFormat === "date") {
    return value;
  }
  if (props.modelFormat === "array") {
    return [value.getFullYear(), value.getMonth() + 1, value.getDate()];
  }
  if (props.modelFormat === "string") {
    return [
      value.getFullYear(),
      pad(value.getMonth() + 1),
      pad(value.getDate()),
    ].join("-");
  }
};

let emitSelection = () => {
  if (props.rangeMode) {
    let model = selectedRange.value.map((d) => dateToModelValue(d));
    emit("update:modelValue", model);
  } else {
    emit("update:modelValue", dateToModelValue(selectedSingle.value));
  }
};

let days = computed(() => {
  let day = getFirstDay(current.year, current.month);
  let daysInMonth = getCountDaysInMonth(current.year, current.month);

  let days = getNumberRange(1, daysInMonth);
  days = days.map((i) => new Date(current.year, current.month, i));

  let { m, y } = prevMonth(current.month, current.year);

  let daysCountPrev = getCountDaysInMonth(y, m);

  let prevMonthDays = getNumberRange(daysCountPrev - day + 1, day);
  if (!props.adjacentMonthsDays) prevMonthDays = prevMonthDays.map((i) => "");

  let nextMonthDays = props.adjacentMonthsDays
    ? getNumberRange(1, 42 - daysInMonth - day)
    : [];

  return [...prevMonthDays, ...days, ...nextMonthDays];
});

let transitionDirection = ref("");
let { transitionName } = toRefs(props);

let rangeState = ref(0);
let { rangeMode } = toRefs(props);

let rangeSelectionStates = {
  UNSELECTED: 0,
  FROM_SELECTED: 1,
  TO_SELECTED: 2,
};

let selectedSingle = ref("");
let selectedRange = ref([]);

let mouseOverDate = ref(null);

watch(rangeMode, () => reset());

let reset = () => {
  selectedSingle.value = null;
  selectedRange.value = [];
  rangeState.value = rangeSelectionStates.UNSELECTED;
};

let addRangeDate = (date) => {
  if (rangeState.value === rangeSelectionStates.TO_SELECTED) {
    selectedRange.value = [];
    rangeState.value = rangeSelectionStates.UNSELECTED;
  }
  selectedRange.value[rangeState.value] = date;
  rangeState.value++;
};

let handleMouseOverDay = (date) => {
  mouseOverDate.value = date;
};

let handleControlButtonClick = (action) => {
  if (action === "prev-month") {
    transitionDirection.value = "prev";
    setPrevMonth();
  } else if (action === "next-month") {
    transitionDirection.value = "next";
    setNextMonth();
  } else if (action === "prev-year") {
    transitionDirection.value = "prev";
    setPrevYear();
  } else if (action === "next-year") {
    transitionDirection.value = "next";
    setNextYear();
  }
};

let handleDayClicked = (date, variant) => {
  if (!props.onDayClicked) {
    handleDayClickedDefault(date);
    return;
  }

  emit("day-clicked", {
    date,
    variant,
    next: () => handleDayClickedDefault(date),
  });
};

let handleDayClickedDefault = (date) => {
  if (props.rangeMode) {
    addRangeDate(date);
    if (rangeState.value == 2) {
      if (selectedRange.value[0] > selectedRange.value[1]) {
        selectedRange.value.reverse();
      }
      if (props.autoEmit) emitSelection();
    }
  } else {
    selectedSingle.value = date;
    if (props.autoEmit) emitSelection();
  }
};

let slotProps = reactive({
  days,
  names,
  today,
  todayFormatted,
  current,
  selectedSingle,
  selectedRange,
  rangeState,
  rangeMode,
  mouseOverDate,
  events: {
    handleDayClicked,
    handleControlButtonClick,
    handleMouseOverDay,
  },
});

provide("days", days);
provide("names", names);
provide("today", today);
provide("current", current);
provide("events", {
  handleDayClicked,
  handleControlButtonClick,
  handleMouseOverDay,
});
provide("todayFormatted", todayFormatted);
provide("selectedSingle", selectedSingle);
provide("selectedRange", selectedRange);
provide("rangeMode", rangeMode);
provide("rangeState", rangeState);
provide("mouseOverDate", mouseOverDate);

provide("customVariants", props.customVariants);
provide("transition", { transitionName, transitionDirection });
provide("rangeSelectionStates", rangeSelectionStates);
</script>
