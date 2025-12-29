<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ config('app.name', 'Laravel') }}</title>
    @viteReactRefresh
    @vite(['resources/js/app.tsx', 'resources/css/app.css'])
    @routes
</head>
<body>
    <div id="app" data-page="{{ json_encode($page) }}"></div>
</body>
</html>