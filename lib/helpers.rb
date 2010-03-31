module Mynute
  module Helpers
    def constants_to_options(klass)
      klass.constants.each do |c|
        haml_tag :option, klass.const_get(c)
      end
    end
  
    def lookup_options(entity_klass, attr_name=nil)
      attr_name ||= :name
      entity_klass.all.each do |e|
        haml_tag :option, e.send(attr_name), :value => e.id
      end
    end
  end
end