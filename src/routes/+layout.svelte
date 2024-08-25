<script>
	import '../app.css'
</script>

<div
	class="flex h-screen w-screen flex-col items-center justify-center bg-gradient-to-bl from-primary/55 to-secondary/55">
	<slot></slot>
	<div class="absolute bottom-2 w-screen">
		<div class="mx-2 flex w-full items-center justify-center">
			<a class="btn btn-link" href="https://github.com/marinastudios/votething">GitHub</a>
		</div>
	</div>
</div>
