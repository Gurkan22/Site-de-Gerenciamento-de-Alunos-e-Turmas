package com.carlosribeiro.apirestful;

//import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.carlosribeiro.apirestful.model.Aluno;
import com.carlosribeiro.apirestful.model.Inscricao;
import com.carlosribeiro.apirestful.model.Professor;
import com.carlosribeiro.apirestful.model.Turma;
import com.carlosribeiro.apirestful.repository.AlunoRepository;
import com.carlosribeiro.apirestful.repository.InscricaoRepository;
import com.carlosribeiro.apirestful.repository.ProfessorRepository;
import com.carlosribeiro.apirestful.repository.TurmaRepository;

@SpringBootApplication
public class ApirestfulApplication implements CommandLineRunner {

	@Autowired
	private ProfessorRepository professorRepository;
	@Autowired
	private AlunoRepository alunoRepository;
	@Autowired
	private TurmaRepository turmaRepository;
	@Autowired
	private InscricaoRepository inscricaoRepository;

	public static void main(String[] args) {
		SpringApplication.run(ApirestfulApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		
		// Professores

		Professor prof1 = professorRepository.save(new Professor("Carlos Ribeiro", "carlos@professor.com"));
		Professor prof2 = professorRepository.save(new Professor("Vanessa Braganholo", "vanessa@professor.com"));
		Professor prof3 = professorRepository.save(new Professor("Bruno Lopes", "bruno@professor.com"));

		// Alunos

		Aluno aluno1 = alunoRepository.save(new Aluno("Ana Lima", "ana@aluno.com"));
		Aluno aluno2 = alunoRepository.save(new Aluno("Bruno Costa", "bruno@aluno.com"));
		Aluno aluno3 = alunoRepository.save(new Aluno("Carla Dias", "carla@aluno.com"));
		Aluno aluno4 = alunoRepository.save(new Aluno("Daniel Alves", "daniel@aluno.com"));
		Aluno aluno5 = alunoRepository.save(new Aluno("Eduarda Melo", "eduarda@aluno.com"));
		Aluno aluno6 = alunoRepository.save(new Aluno("Felipe Rocha", "felipe@aluno.com"));
		Aluno aluno7 = alunoRepository.save(new Aluno("Gabriela Nunes", "gabriela@aluno.com"));
		Aluno aluno8 = alunoRepository.save(new Aluno("Henrique Luz", "henrique@aluno.com"));
		Aluno aluno9 = alunoRepository.save(new Aluno("Isabela Reis", "isabela@aluno.com"));
		Aluno aluno10 = alunoRepository.save(new Aluno("Juliana Prado", "juliana@aluno.com"));

		// Turmas (2 para cada professor)

		Turma turma1 = new Turma("Programação I", prof3, 2025, "Manhã");
		turma1 = turmaRepository.save(turma1);

		Turma turma2 = new Turma("Programação II", prof3, 2025, "Tarde");
		turma2 = turmaRepository.save(turma2);

		Turma turma3 = new Turma("Banco de Dados I", prof2, 2025, "Noite");
		turma3 = turmaRepository.save(turma3);

		Turma turma4 = new Turma("Banco de Dados II", prof2, 2025, "Manhã");
		turma4 = turmaRepository.save(turma4);

		Turma turma5 = new Turma("Programação Orientada a Objetos", prof1, 2025, "Tarde");
		turma5 = turmaRepository.save(turma5);

		Turma turma6 = new Turma("Desenvolvimento Web", prof1, 2025, "Noite");
		turma6 = turmaRepository.save(turma6);

		// Inscrições de alunos em turmas

		Inscricao insc1 = new Inscricao(aluno1, turma1);
		inscricaoRepository.save(insc1);

		Inscricao insc2 = new Inscricao(aluno1, turma2);
		inscricaoRepository.save(insc2);

		Inscricao insc3 = new Inscricao(aluno2, turma1);
		inscricaoRepository.save(insc3);

		Inscricao insc4 = new Inscricao(aluno2, turma3);
		inscricaoRepository.save(insc4);

		Inscricao insc5 = new Inscricao(aluno3, turma4);
		inscricaoRepository.save(insc5);

		Inscricao insc6 = new Inscricao(aluno4, turma5);
		inscricaoRepository.save(insc6);

		Inscricao insc7 = new Inscricao(aluno5, turma1);
		inscricaoRepository.save(insc7);

		Inscricao insc8 = new Inscricao(aluno5, turma2);
		inscricaoRepository.save(insc8);

		Inscricao insc9 = new Inscricao(aluno5, turma3);
		inscricaoRepository.save(insc9);

		Inscricao insc10 = new Inscricao(aluno6, turma6);
		inscricaoRepository.save(insc10);

		Inscricao insc11 = new Inscricao(aluno7, turma2);
		inscricaoRepository.save(insc11);

		Inscricao insc12 = new Inscricao(aluno7, turma3);
		inscricaoRepository.save(insc12);

		Inscricao insc13 = new Inscricao(aluno8, turma4);
		inscricaoRepository.save(insc13);
		
		// aluno9 e aluno10 não inscritos em nenhuma turma
	}
}
