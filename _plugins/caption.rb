module Jekyll
  class ImageTag < Liquid::Tag
    @url = nil
    @caption = nil

    IMAGE_URL_WITH_CAPTION = /((https?:\/\/|\/)(\S+))(\s+)"(.*?)"/i
    IMAGE_URL = /((https?:\/\/|\/)(\S+))/i

    def initialize(tag_name, markup, tokens)
      super

      if markup =~ IMAGE_URL_WITH_CAPTION
        @url     = $1
        @caption = $5
      elsif markup =~ IMAGE_URL
        @url = $1
      end
    end

    def render(context)
      source  = "<figure>"
      source += "<figcaption>#{@caption}</figcaption>" if @caption
      source += "<a href=\"#{@url}\" "
      source += "title=\"#{@caption}\" " if @caption
      source += "><img src=\"/dist/img/spinner.gif\" data-echo=\"#{@url}\"></a>"
      source += "</figure>"

      source
    end
  end
end

Liquid::Template.register_tag('image', Jekyll::ImageTag)