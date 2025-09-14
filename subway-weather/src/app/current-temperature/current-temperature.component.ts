import { Component, signal, ChangeDetectionStrategy } from '@angular/core';

// Slice 1: Static mocked temperature card (no real HTTP yet)

@Component({
  selector: 'app-current-temperature',
  template: `
    <div class="tw-bg-white tw-rounded-lg tw-shadow tw-p-4 tw-border tw-border-gray-200 tw-w-64">
      <h2 class="tw-text-sm tw-font-semibold tw-text-gray-600">Current Temperature</h2>
      @if (loading()) {
        <div class="tw-animate-pulse tw-h-10 tw-flex tw-items-center tw-text-gray-400">Loading…</div>
      } @else {
        <div class="tw-mt-2">
          <div class="tw-text-4xl tw-font-bold tw-text-gray-900">{{ temperature() }}°C</div>
          <div class="tw-text-xs tw-mt-1 tw-text-gray-500">as of {{ timestamp() }}</div>
          <div class="tw-text-[10px] tw-uppercase tw-tracking-wide tw-mt-2 tw-text-gray-400">Mock Data</div>
        </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'data-test': 'current-temperature-card'
  }
})
export class CurrentTemperatureComponent {
  protected readonly loading = signal(true);
  protected readonly temperature = signal<number | null>(null);
  protected readonly timestamp = signal<string>('');

  constructor() {
    // For slice 1 we bypass async HTTP & produce a static mock after a microtask
    queueMicrotask(() => {
      const reading = { value: 22, unit: 'celsius', timestamp: new Date() };
      this.temperature.set(reading.value);
      this.timestamp.set(reading.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      this.loading.set(false);
    });
  }
}
