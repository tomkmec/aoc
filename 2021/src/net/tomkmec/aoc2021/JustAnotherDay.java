package net.tomkmec.aoc2021;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.stream.Stream;

public abstract class JustAnotherDay {
    public Stream<String> data() throws IOException, URISyntaxException {
        String fileName = this.getClass().getSimpleName().substring(3) + ".txt";
        URI uri = this.getClass().getClassLoader().getResource(fileName).toURI();
        return Files.lines(Path.of(uri));
    }
}
