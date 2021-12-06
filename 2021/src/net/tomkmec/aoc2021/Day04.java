package net.tomkmec.aoc2021;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.*;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Day04 extends JustAnotherDay {
    public static void main(String[] args) throws IOException, URISyntaxException {
        AtomicInteger board = new AtomicInteger(-1);
        Queue<Integer> numbers = new ArrayDeque<>();
        List<Row> rows = new ArrayList<>();
        new Day04().data().forEach(l -> {
            if (l.isBlank()) {
                rows.addAll(transpose(board.get(), rows.stream().filter(r -> r.board == board.get()).collect(Collectors.toList())));
                board.getAndIncrement();
            }
            else if (board.get() == -1) {
                Arrays.stream(l.split(",")).map(Integer::parseInt).forEach(numbers::add);
            } else {
                rows.add(new Row(board.get(), Arrays.stream(l.stripLeading().split(" +")).map(Integer::parseInt).collect(Collectors.toList())));
            }
        });
        rows.addAll(transpose(board.get(), rows.stream().filter(r -> r.board == board.get()).collect(Collectors.toList())));

        AtomicInteger drawn = new AtomicInteger();
        Set<Integer> winningBoards = new LinkedHashSet<>();
        do {
            drawn.set(numbers.remove());
            rows.forEach(r -> r.content.remove((Object)drawn.get()));
            rows.stream().filter(r->r.content.isEmpty()).map(r->r.board).forEach(winningBoards::add);
        } while (winningBoards.isEmpty());

        Integer remainingSum = rows.stream()
                .filter(r -> r.board == winningBoards.iterator().next())
                .flatMap(r -> r.content.stream())
                .reduce(0, Integer::sum) / 2;

        System.out.println(drawn.get() * remainingSum);

        do {
            drawn.set(numbers.remove());
            rows.forEach(r -> r.content.remove((Object)drawn.get()));
            rows.stream().filter(r->r.content.isEmpty()).map(r->r.board).forEach(winningBoards::add);
        } while (winningBoards.size() <= board.get());

        remainingSum = rows.stream()
                .filter(r -> r.board == winningBoards.stream().reduce((a,b) ->b).get())
                .flatMap(r -> r.content.stream())
                .reduce(0, Integer::sum) / 2;
        System.out.println(drawn.get() * remainingSum);
    }

    static List<Row> transpose(Integer board, List<Row> in) {
        List<Row> out = new ArrayList<>(in.size());
        IntStream.range(0, in.size()).forEach(i->
            out.add(new Row(board, in.stream().map(r -> r.content.get(i)).collect(Collectors.toList())))
        );
        return out;
    }

    private static class Row {
        int board;
        List<Integer> content;

        public Row(int board, List<Integer> content) {
            this.board = board;
            this.content = content;
        }

        @Override
        public String toString() {
            return "Row{" +
                    "board=" + board +
                    ", content=" + content +
                    '}';
        }
    }
}
