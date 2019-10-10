require 'csv'
require 'json'

ABBREV_MAP = {
  "US-AK": "Alaska",
  "US-AL": "Alabama",
  "US-AZ": "Arizona",
  "US-AR": "Arkansas",
  "US-CA": "California",
  "US-CO": "Colorado",
  "US-CT": "Connecticut",
  "US-DE": "Delaware",
  "US-FL": "Florida",
  "US-GA": "Georgia",
  "US-HI": "Hawaii",
  "US-ID": "Idaho",
  "US-IL": "Illinois",
  "US-IN": "Indiana",
  "US-IA": "Iowa",
  "US-KS": "Kansas",
  "US-KY": "Kentucky",
  "US-LA": "Louisiana",
  "US-ME": "Maine",
  "US-MD": "Maryland",
  "US-MA": "Massachusetts",
  "US-MI": "Michigan",
  "US-MN": "Minnesota",
  "US-MS": "Mississippi",
  "US-MO": "Missouri",
  "US-MT": "Montana",
  "US-NE": "Nebraska",
  "US-NV": "Nevada",
  "US-NH": "New Hampshire",
  "US-NJ": "New Jersey",
  "US-NM": "New Mexico",
  "US-NY": "New York",
  "US-NC": "North Carolina",
  "US-ND": "North Dakota",
  "US-OH": "Ohio",
  "US-OK": "Oklahoma",
  "US-OR": "Oregon",
  "US-PA": "Pennsylvania",
  "US-RI": "Rhode Island",
  "US-SC": "South Carolina",
  "US-SD": "South Dakota",
  "US-TN": "Tennessee",
  "US-TX": "Texas",
  "US-UT": "Utah",
  "US-VT": "Vermont",
  "US-VA": "Virginia",
  "US-WA": "Washington",
  "US-WV": "West Virginia",
  "US-WI": "Wisconsin",
  "US-WY": "Wyoming",
  "US-DC": "Washington, D.C."
}

File.open('./us_airports.json', "w") do |out|
  keys = ["iata", "name", "city", "state", "lat", "lng", "size"]
  data = CSV.read('./airports.csv').select do |line|
    line[8] == "US" && !line[13].nil? && %w(small_airport medium_airport large_airport).include?(line[2])
  end.map! do |line|
    line[10] = "New York City" if line[10] == "New York"
    values = [line[13], line[3], line[10], ABBREV_MAP[line[9].to_sym], line[4], line[5], line[2]]
    Hash[keys.zip(values)]
  end.sort! { |a, b| a["iata"] <=> b["iata"] }
  out.puts(JSON.pretty_generate(data))
end
