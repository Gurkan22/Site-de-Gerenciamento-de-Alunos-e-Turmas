package com.pedroalmeida.excecao;

public class AlunoNaoEncontradoException extends Exception {
    private static final long serialVersionUID = 1L;
    private int codigo;

    public AlunoNaoEncontradoException(String msg) {
        super(msg);
    }

    public AlunoNaoEncontradoException(int codigo, String msg) {
        super(msg);
        this.codigo = codigo;
    }

    public int getCodigoDeErro() {
        return codigo;
    }
}
