<html>
    <body>
        <h1>{{ $category->name }}</h1>
        @foreach($teams as $team)
            <p>{{ $team->name }}</p>
        @endforeach
    </body>
</html>