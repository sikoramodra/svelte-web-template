<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<div class="bg-dark text-muted flex min-h-screen flex-col">
  <main class="container mx-auto flex-grow p-4">
    {@render children()}
  </main>
</div>
