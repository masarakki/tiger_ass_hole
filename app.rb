require 'sinatra'
require 'sinatra/json'
require 'rack/contrib'
require 'sinatra/reloader' if development?
require 'haml'
require 'gepub'
require 'ostruct'
require 'securerandom'
require 'pry' if development?

use Rack::PostBodyContentTypeParser

unless ENV['SRC'] && ENV['DEST']
  puts "ENV['SRC'] and ENV['DEST'] was required"
  exit 1
end

def src
  ENV['SRC']
end
def dest
  ENV['DEST']
end

def images(range)
  Dir.glob("#{src}/*").sort[0,range]
end

def create_epub(images, meta)
  builder = GEPUB::Builder.new(epub_backward_compat: false) {
    language 'ja'
    unique_identifier SecureRandom.uuid

    title meta.title
    date "#{meta.released_at} 10:00:00"
    creator meta.circle
    publisher meta.circle
    page_progression_direction meta.direction

    resources(workdir: src) {
      cover_image "cover#{File.extname(images.first)}" => File.basename(images.first)
      ordered {
        images.each_with_index do |image, index|
          file "images/p#{"%06d" % (index + 1)}#{File.extname(image)}" =>  File.basename(image)
        end
      }
    }
  }
  dir = "#{dest}/#{meta.circle}"
  FileUtils.mkdir_p dir unless File.exist? dir
  raise if File.exist? "#{dir}/#{meta.title}.epub"
  builder.generate_epub("#{dir}/#{meta.title}.epub")
end

class Images < Sinatra::Base
  set :public_dir, ENV['SRC']
end

get '/' do
  haml :index
end

post '/epub' do
  range = params[:range]
  epub_images = images(range)
  create_epub(epub_images, OpenStruct.new(params[:meta]))
  FileUtils.rm epub_images
  json success: true
end

get '/images' do
  json images(100).map{|x| File.basename(x)}
end

get '/images/:file' do
  send_file File.join(src, params[:file])
end
