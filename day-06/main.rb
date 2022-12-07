content = File.read(File.join(File.dirname(__FILE__), 'input.txt'))

def find_marker_position(content, marker_length)
    (0..content.length).each do |i|
        packet_marker = content.slice(i, marker_length)
        if packet_marker.chars.sort.join.squeeze.length === marker_length
            return i + marker_length
        end
    end
end

puts "Part 1: #{find_marker_position(content, 4)}"
puts "Part 2: #{find_marker_position(content, 14)}"
