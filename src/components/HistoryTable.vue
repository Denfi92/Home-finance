<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{ $filters.localize('Amount') }}</th>
      <th>{{ $filters.localize('Date') }}</th>
      <th>{{ $filters.localize('Category') }}</th>
      <th>{{ $filters.localize('Type') }}</th>
      <th>{{ $filters.localize('Open') }}</th>
    </tr>
    </thead>

    <tbody>
    <tr  v-for="(record, idx) of records" :key="record.id">
      <td>{{ idx + 1 }}</td>
      <td>{{ $filters.currency(record.amount) }}</td>
      <td>{{ $filters.date(record.date) }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
          class="white-text badge"
          :class="[record.typeClass]"
        >{{ record.typeText }}</span>
      </td>
      <td>
        <button
          class="btn-small btn"
          @click="$router.push('/detail/' + record.id)"
          v-tooltip="'OpenRecord'"
          >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  props: {
    records: {
      required: true,
      type: Array,
    },
  },
};

</script>
