package net.tomkmec.aoc2021;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class Day03 extends JustAnotherDay{
    public static void main(String[] args) throws IOException, URISyntaxException {
        List<List<Integer>> preprocessed = new Day03().data()
                .map(l -> l.chars().map(ch -> ch == '1' ? 1 : 0).boxed().collect(Collectors.toList()))
                .collect(Collectors.toList());

        Sums sums = preprocessed.stream().collect(Sums::new, Sums::add, Sums::merge);
        System.out.println(Integer.parseInt(sums.getGamma(), 2) * Integer.parseInt(sums.getEpsilon(),2));

        List<List<Integer>> o2pool = new ArrayList<>(preprocessed);
        List<List<Integer>> co2pool = new ArrayList<>(preprocessed);
        for (int i=0; i<preprocessed.get(0).size(); i++) {
            if (o2pool.size() > 1) {
                Sums o2sums = o2pool.stream().collect(Sums::new, Sums::add, Sums::merge);
                o2pool.removeIf(o2sums.getO2RemovalPredicate(i));
            }

            if (co2pool.size() > 1) {
                Sums co2sums = co2pool.stream().collect(Sums::new, Sums::add, Sums::merge);
                co2pool.removeIf(co2sums.getCO2RemovalPredicate(i));
            }
        }
        System.out.println(parseBinary(o2pool.get(0)) * parseBinary(co2pool.get(0)));
    }

    private static int parseBinary(List<Integer> integers) {
        return Integer.parseInt(integers.stream().map(String::valueOf).collect(Collectors.joining()), 2);
    }


    static class Sums {
        int count;
        List<Integer> acc;

        Sums add(List<Integer> row) {
            count++;
            internalAdd(row);
            return this;
        }

        Sums merge(Sums x) {
            count += x.count;
            internalAdd(x.acc);
            return this;
        }

        private void internalAdd(List<Integer> row) {
            if (acc == null) {
                acc = new ArrayList<>(row);
            } else {
                for (int i=0; i<row.size(); i++) {
                    acc.set(i, acc.get(i) + row.get(i));
                }
            }
        }

        String getGamma() {
            return acc.stream().map(i -> i > count / 2 ? "1" : "0").collect(Collectors.joining());
        }

        String getEpsilon() {
            return acc.stream().map(i -> i < count / 2 ? "1" : "0").collect(Collectors.joining());
        }

        public Predicate<? super List<Integer>> getO2RemovalPredicate(int i) {
            return row -> row.get(i).equals(2*acc.get(i) >= count ? 0 : 1);
        }

        public Predicate<? super List<Integer>> getCO2RemovalPredicate(int i) {
            return row -> row.get(i).equals(2*acc.get(i) >= count ? 1 : 0);
        }
    }
}
