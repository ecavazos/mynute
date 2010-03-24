helpers do
  def constants_to_options(klass)
    klass.constants.each do |c|
      haml_tag :option, klass.class_eval("#{c}")
    end
  end
  
end