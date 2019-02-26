module Kramdown
  module Converter
    class CssFootnotesHtml < Html
      def convert_footnote(el, indent)
        repeat = ''
        number = @footnote_counter
        @footnote_counter += 1
        @footnotes << [el.options[:name], el.value, number, 0]
        @footnotes_by_name[el.options[:name]] = @footnotes.last
        content=Marshal.load(Marshal.dump(el.value.children))
        "#{content}"
      end

      def footnote_content
        ol = Element.new(:ol)
        ol.attr['start'] = @footnote_start if @footnote_start != 1
        i = 0
        while i < @footnotes.length
          name, data, _, repeat = *@footnotes[i]
          li = Element.new(:li, nil, {'id' => "fn:#{name}"})
          li.children = Marshal.load(Marshal.dump(data.children))

          if li.children.last.type == :p
            para = li.children.last
            insert_space = true
          else
            li.children << (para = Element.new(:p))
            insert_space = false
          end

          para.children << Element.new(:raw, FOOTNOTE_BACKLINK_FMT % [insert_space ? ' ' : '', name, "&#8617;"])
          (1..repeat).each do |index|
            para.children << Element.new(:raw, FOOTNOTE_BACKLINK_FMT % [" ", "#{name}:#{index}", "&#8617;<sup>#{index+1}</sup>"])
          end

          ol.children << Element.new(:raw, convert(li, 4))
          i += 1
        end
        (ol.children.empty? ? '' : format_as_indented_block_html('div', {:class => "footnotes"}, convert(ol, 2), 0))
      end
    end
  end
end

# This class is the actual custom Jekyll converter.
class Jekyll::Converters::Markdown::KramdownCssFootnotes
  def initialize(config)
    puts "using css footnotes"
    require 'kramdown'
    @config = config
  rescue LoadError
    STDERR.puts 'You are missing a library required for Markdown. Please run:'
    STDERR.puts '  $ [sudo] gem install kramdown'
    raise FatalException.new("Missing dependency: kramdown")
  end

  def convert(content)
    options = @config['kramdown']
    kramdown = Kramdown::Document.new(content, options);
    html = kramdown.to_css_footnotes_html
    return html;
  end
end