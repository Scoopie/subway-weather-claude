import { describe, it, expect } from 'vitest';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { App } from '../../app/app';

// Slice 1 integration test without external testing libraries.

describe('Current Temperature Card (Slice 1)', () => {
  it('renders static mock temperature card contents', () => {
    TestBed.configureTestingModule({
      imports: [App],
      providers: [provideZonelessChangeDetection()]
    });
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    const card = el.querySelector('[data-test="current-temperature-card"]');
    expect(card).toBeTruthy();
    const text = card?.textContent || '';
    expect(text).toMatch(/22°C/);
    expect(text).toMatch(/Mock Data/i);
  });
});
