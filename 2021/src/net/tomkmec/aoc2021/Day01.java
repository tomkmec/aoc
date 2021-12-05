package net.tomkmec.aoc2021;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Day01 extends JustAnotherrDay {
    public static void main(String[] args) throws IOException, URISyntaxException {
        Stream<String> data = new Day01().data();
        List<Long> numbers = data.map(Long::parseLong).collect(Collectors.toList());
        System.out.println(part1(numbers));
        System.out.println(part2(numbers, 1)); //check - same as part 1
        System.out.println(part2(numbers, 3));
    }

    private static long part1(List<Long> numbers) {
        return IntStream.range(0, numbers.size()-1).filter(i-> numbers.get(i)<numbers.get(i+1)).count();
    }

    private static long part2(List<Long> numbers, int windowSize) {
        List<Long> sums = IntStream.range(0, numbers.size()-windowSize+1)
                .mapToObj(i -> IntStream.range(i, i+windowSize).mapToLong(numbers::get).sum())
                .collect(Collectors.toList());
        return IntStream.range(0, sums.size()-1).filter(i-> sums.get(i)<sums.get(i+1)).count();
    }
}
