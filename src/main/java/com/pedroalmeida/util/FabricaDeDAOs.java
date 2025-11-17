package com.pedroalmeida.util;

import java.lang.reflect.InvocationTargetException;
import java.util.Set;

import org.reflections.Reflections;

public class FabricaDeDAOs {
    public static <T> T getDAO(Class<T> tipo) {
        Reflections reflections = new Reflections("com.pedroalmeida");
        Set<Class<? extends T>> conjunto = reflections.getSubTypesOf(tipo);
        if (conjunto.size() != 1) throw new RuntimeException(
                "Deve haver uma, e apenas uma, classe que implementa a interface " + tipo.getName());
        Class<? extends T> classe = conjunto.iterator().next();
        try {
            return classe.getConstructor().newInstance();
        } catch (InstantiationException |
                 NoSuchMethodException |
                 InvocationTargetException |
                 IllegalAccessException e) {
            throw new RuntimeException(e);
        }
    }
}
