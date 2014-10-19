module Jekyll

  class PlunkerTag < Liquid::Tag
    @url = ""
    def initialize(tag_name, url, tokens)
      @url = url
      super
    end

    def render(context)
      output = super
      markup = "<div class='embed'><iframe sandbox='allow-scripts' src='" + @url + "'></iframe></div>"
    end
  end
end

Liquid::Template.register_tag('plunker', Jekyll::PlunkerTag)
