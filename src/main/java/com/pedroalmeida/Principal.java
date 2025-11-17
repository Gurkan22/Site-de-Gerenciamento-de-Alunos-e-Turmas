package com.pedroalmeida;

import java.util.List;
import java.util.Scanner;

import com.pedroalmeida.dao.AlunoDAO;
import com.pedroalmeida.excecao.AlunoNaoEncontradoException;
import com.pedroalmeida.modelo.Aluno;
import com.pedroalmeida.util.FabricaDeDAOs;

public class Principal {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        AlunoDAO alunoDAO = FabricaDeDAOs.getDAO(AlunoDAO.class);
        boolean continua = true;
        while (continua) {
            System.out.println("\nO que você deseja fazer?");
            System.out.println("1. Cadastrar um aluno");
            System.out.println("2. Alterar um aluno");
            System.out.println("3. Remover um aluno");
            System.out.println("4. Listar todos os alunos");
            System.out.println("5. Sair");
            System.out.print("Digite um número entre 1 e 5: ");
            int opcao = scanner.nextInt();
            scanner.nextLine();
            switch (opcao) {
                case 1: {
                    System.out.print("Informe o nome do aluno: ");
                    String nome = scanner.nextLine();
                    System.out.print("Informe o email do aluno: ");
                    String email = scanner.nextLine();
                    Aluno aluno = new Aluno(nome, email);
                    alunoDAO.inclui(aluno);
                    System.out.println("Aluno número " + aluno.getId() + " incluído com sucesso!");
                    break;
                }
                case 2: {
                    System.out.print("Informe o ID do aluno a alterar: ");
                    long id = scanner.nextLong();
                    scanner.nextLine();
                    try {
                        Aluno aluno = alunoDAO.recuperaUmAluno(id);
                        System.out.print("Novo nome: ");
                        aluno.setNome(scanner.nextLine());
                        System.out.print("Novo email: ");
                        aluno.setEmail(scanner.nextLine());
                        alunoDAO.altera(aluno);
                        System.out.println("Aluno alterado com sucesso!");
                    } catch (AlunoNaoEncontradoException e) {
                        System.out.println("Aluno não encontrado!");
                    }
                    break;
                }
                case 3: {
                    System.out.print("Informe o ID do aluno a remover: ");
                    long id = scanner.nextLong();
                    scanner.nextLine();
                    try {
                        alunoDAO.exclui(id);
                        System.out.println("Aluno removido com sucesso!");
                    } catch (AlunoNaoEncontradoException e) {
                        System.out.println("Aluno não encontrado!");
                    }
                    break;
                }
                case 4: {
                    List<Aluno> alunos = alunoDAO.recuperaAlunos();
                    for (Aluno a : alunos) {
                        System.out.println("ID: " + a.getId() + ", Nome: " + a.getNome() + ", Email: " + a.getEmail());
                    }
                    break;
                }
                case 5: {
                    continua = false;
                    break;
                }
                default:
                    System.out.println("Opção inválida!");
            }
        }
        scanner.close();
    }
}
