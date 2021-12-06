package net.tomkmec.aoc2021;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.Map;
import java.util.stream.Collectors;

public class Day02 extends JustAnotherDay {
    public static void main(String[] args) throws IOException, URISyntaxException {
        Map<String, Integer> r = new Day02().data()
                .map(s -> s.split(" "))
                .collect(Collectors.groupingBy(x -> x[0], Collectors.summingInt(x -> Integer.parseInt(x[1]))));
        System.out.println(r.get("forward") * (r.get("down") - r.get("up")) );

        Pos finalPos = new Day02().data().map(s -> s.split(" ")).collect(Pos::new, Pos::apply, (a,b) -> {});
        System.out.println(finalPos.x * finalPos.y);
    }

    private static class Pos {
        int aim, x, y;
        Pos apply(String[] i) {
            int a = Integer.parseInt(i[1]);
            switch (i[0]) {
                case "forward": x += a; y += aim*a; break;
                case "up": aim -= a; break;
                case "down": aim += a; break;
                default:
            }
          return this;
        }
    }
}
