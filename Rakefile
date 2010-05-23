require 'rake'

task :seed do
  path = File.dirname(__FILE__)
  seed_file = File.join(path, 'db', 'seeds.rb')
  load(seed_file) if File.exist?(seed_file)
end
