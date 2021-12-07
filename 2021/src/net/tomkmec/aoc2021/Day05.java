package net.tomkmec.aoc2021;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Map;
import java.util.Objects;
import java.util.Scanner;
import java.util.function.Function;
import java.util.regex.MatchResult;
import java.util.regex.Pattern;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Day05 extends JustAnotherDay {
    private static final Pattern PATTERN = Pattern.compile("(\\d+),(\\d+) -> (\\d+),(\\d+)");

    public static void main(String[] args) throws IOException, URISyntaxException {
        System.out.println(mappingResult(false));
        System.out.println(mappingResult(true));
    }

    private static long mappingResult(boolean diagonals) throws IOException, URISyntaxException {
        Map<Point, Integer> map = new Day05().data()
                .map(Line::new)
                .filter((l -> diagonals || l.x1==l.x2 || l.y1 == l.y2))
                .flatMap(Line::getPoints)
                .collect(Collectors.toMap(Function.identity(), p -> 1, Integer::sum));
        return map.values().stream().filter(a -> a>1).count();
    }

    private static class Point {
        final int x,y;
        Point(int x, int y) { this.x = x; this.y = y; }

        public boolean equals(Object o) { return o instanceof Point && x == ((Point) o).x && y == ((Point) o).y; }
        public int hashCode() { return Objects.hash(x, y); }
        public String toString() { return "Point{x=" + x +", y=" + y + '}'; }
    }

    private static class Line {
        int x1, x2, y1, y2;
        Line(String desc) {
            Scanner scanner = new Scanner(desc);
            scanner.findInLine(PATTERN);
            MatchResult mr = scanner.match();
            x1 = Integer.parseInt(mr.group(1));
            y1 = Integer.parseInt(mr.group(2));
            x2 = Integer.parseInt(mr.group(3));
            y2 = Integer.parseInt(mr.group(4));
        }

        public Stream<Point> getPoints() {
            if (x1==x2) {
                return IntStream.rangeClosed(Math.min(y1,y2), Math.max(y1,y2)).mapToObj(y -> new Point(x1, y));
            } else if (y1==y2) {
                return IntStream.rangeClosed(Math.min(x1,x2), Math.max(x1,x2)).mapToObj(x -> new Point(x, y1));
            } else {
                return IntStream.rangeClosed(0, Math.abs(x2-x1))
                        .mapToObj(i -> new Point(x1+i*((x2>x1)?1:-1), y1+i*((y2>y1)?1:-1)));
            }
        }
    }
}
