<script setup lang="ts"></script>

<template>
  <div class="connection-row-skeleton">
    <div class="connection-row-skeleton__box connection-row-skeleton__box--party">
      <div class="connection-row-skeleton__party">
        <div class="connection-row-skeleton__badge shimmer" />
        <div class="connection-row-skeleton__meta">
          <div class="connection-row-skeleton__line connection-row-skeleton__line--name shimmer" />
          <div class="connection-row-skeleton__line connection-row-skeleton__line--role shimmer" />
        </div>
      </div>
    </div>

    <div class="connection-row-skeleton__arrow shimmer" />

    <div class="connection-row-skeleton__box connection-row-skeleton__box--status">
      <div class="connection-row-skeleton__center">
        <div class="connection-row-skeleton__pill shimmer" />
        <div class="connection-row-skeleton__line connection-row-skeleton__line--channel shimmer" />
      </div>
    </div>

    <div class="connection-row-skeleton__arrow shimmer" />

    <div class="connection-row-skeleton__box connection-row-skeleton__box--party">
      <div class="connection-row-skeleton__party connection-row-skeleton__party--right">
        <div class="connection-row-skeleton__meta connection-row-skeleton__meta--right">
          <div class="connection-row-skeleton__line connection-row-skeleton__line--name shimmer" />
          <div class="connection-row-skeleton__line connection-row-skeleton__line--role shimmer" />
        </div>
        <div class="connection-row-skeleton__badge shimmer" />
      </div>
    </div>

    <div class="connection-row-skeleton__box connection-row-skeleton__box--finance">
      <div class="connection-row-skeleton__finance">
        <div class="connection-row-skeleton__line connection-row-skeleton__line--amount shimmer" />
        <div class="connection-row-skeleton__line connection-row-skeleton__line--date shimmer" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.connection-row-skeleton {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 24px minmax(0, 1fr) 24px minmax(0, 1fr) 116px;
  align-items: stretch;
  column-gap: 12px;
  background: #F9F9F9;
}

.connection-row-skeleton__box {
  min-height: 50px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.connection-row-skeleton__box--party {
  padding: 0 14px;
}

.connection-row-skeleton__box--status {
  justify-content: center;
  padding: 0 10px;
}

.connection-row-skeleton__box--finance {
  justify-content: flex-end;
  padding: 0 12px;
}

.connection-row-skeleton__party {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}

.connection-row-skeleton__party--right {
  justify-content: flex-end;
}

.connection-row-skeleton__meta {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}

.connection-row-skeleton__meta--right {
  align-items: flex-end;
}

.connection-row-skeleton__badge {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: #ececf1;
  flex: 0 0 40px;
}

.connection-row-skeleton__line {
  border-radius: 999px;
  background: #ececf1;
}

.connection-row-skeleton__line--name {
  width: 76px;
  height: 12px;
}

.connection-row-skeleton__line--role {
  width: 56px;
  height: 10px;
}

.connection-row-skeleton__line--channel {
  width: 66px;
  height: 10px;
}

.connection-row-skeleton__line--amount {
  width: 72px;
  height: 12px;
  margin-left: auto;
}

.connection-row-skeleton__line--date {
  width: 58px;
  height: 10px;
  margin-top: 6px;
  margin-left: auto;
}

.connection-row-skeleton__pill {
  width: 92px;
  height: 18px;
  border-radius: 999px;
  background: #ececf1;
}

.connection-row-skeleton__center {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.connection-row-skeleton__finance {
  width: 100%;
  position: relative;
  padding-left: 12px;
}

.connection-row-skeleton__finance::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 1px;
  height: 34px;
  background: #e7e7eb;
  transform: translateY(-50%);
}

.connection-row-skeleton__arrow {
  align-self: center;
  width: 18px;
  height: 18px;
  border-radius: 6px;
  background: #ececf1;
  justify-self: center;
}

.shimmer {
  position: relative;
  overflow: hidden;
}

.shimmer::after {
  content: '';
  position: absolute;
  inset: 0;
  transform: translateX(-100%);
  background: linear-gradient(
          90deg,
          rgba(255, 255, 255, 0) 0%,
          rgba(255, 255, 255, 0.75) 50%,
          rgba(255, 255, 255, 0) 100%
  );
  animation: shimmer 1.4s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

@media (max-width: 900px) {
  .connection-row-skeleton {
    grid-template-columns: 1fr;
    row-gap: 8px;
  }

  .connection-row-skeleton__arrow {
    display: none;
  }

  .connection-row-skeleton__box--finance {
    justify-content: flex-start;
  }

  .connection-row-skeleton__finance {
    padding-left: 0;
  }

  .connection-row-skeleton__finance::before {
    display: none;
  }
}
</style>