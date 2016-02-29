use Rack::Static,
  :urls => ["/assets","assets/js","/js", "/css"],
  :root => "dist"

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('dist/index.html', File::RDONLY)
  ]
}