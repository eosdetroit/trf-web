require 'csv'
require 'json'

File.open('./all_airports.json', "w") do |out|
  keys = [ "name", "city", "country", "iata", "kdtw", "lat", "lng", ]

  data = CSV.read('./airports.csv')

  #data = CSV.read('./airports.csv').select do |line|
  #  line[13].nil? && %w(small_airport medium_airport large_airport).include?(line[2])
  #end.map! do |line|
  data.map! do |line|
    #print(line)
#3645,"Detroit Metropolitan Wayne County Airport","Detroit","United States","DTW","KDTW",42.212398529052734,-83.35340118408203,645,-5,"A","America/New_York","airport","OurAirports"
    values = [line[1], line[2], line[3], line[4], line[5], line[6], line[7]]
    Hash[keys.zip(values)]
  end.sort! { |a, b| a["iata"] <=> b["iata"] }
  out.puts(JSON.pretty_generate(data))
end
