package com.carlosribeiro.apirestful;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.carlosribeiro.apirestful.model.Aluno;
import com.carlosribeiro.apirestful.model.Inscricao;
import com.carlosribeiro.apirestful.model.Professor;
import com.carlosribeiro.apirestful.model.Turma;
import com.carlosribeiro.apirestful.model.Disciplina;
import com.carlosribeiro.apirestful.repository.AlunoRepository;
import com.carlosribeiro.apirestful.repository.InscricaoRepository;
import com.carlosribeiro.apirestful.repository.ProfessorRepository;
import com.carlosribeiro.apirestful.repository.TurmaRepository;
import com.carlosribeiro.apirestful.repository.DisciplinaRepository;
import com.carlosribeiro.apirestful.auth.model.Usuario;
import com.carlosribeiro.apirestful.auth.repository.UsuarioRepository;
import com.carlosribeiro.apirestful.auth.util.Role;
import org.springframework.security.crypto.password.PasswordEncoder;

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
	@Autowired
	private DisciplinaRepository disciplinaRepository;
	@Autowired
	private UsuarioRepository usuarioRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(ApirestfulApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		// Professores
		Professor prof1 = professorRepository.save(new Professor("Carlos Ribeiro", "carlos@professor.com"));
		Professor prof2 = professorRepository.save(new Professor("Vanessa Braganholo", "vanessa@professor.com"));
		Professor prof3 = professorRepository.save(new Professor("Bruno Lopes", "bruno@professor.com"));

		// Disciplinas
		Disciplina progI = disciplinaRepository.save(new Disciplina("Programação I", 60));
		Disciplina progII = disciplinaRepository.save(new Disciplina("Programação II", 60));
		Disciplina bdI = disciplinaRepository.save(new Disciplina("Banco de Dados I", 60));
		Disciplina bdII = disciplinaRepository.save(new Disciplina("Banco de Dados II", 60));
		Disciplina poo = disciplinaRepository.save(new Disciplina("Programação Orientada a Objetos", 60));
		Disciplina devWeb = disciplinaRepository.save(new Disciplina("Desenvolvimento Web", 60));

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

		// Turmas
		// Carlos: 2 de POO e 2 de Dev Web
		Turma turmaA1 = turmaRepository.save(new Turma("A1", prof1, poo, 2025, "Manhã"));
		Turma turmaA2 = turmaRepository.save(new Turma("A2", prof1, poo, 2025, "Tarde"));
		Turma turmaB1 = turmaRepository.save(new Turma("B1", prof1, devWeb, 2025, "Noite"));
		Turma turmaB2 = turmaRepository.save(new Turma("B2", prof1, devWeb, 2025, "Manhã"));

		// Bruno: 2 de Prog I e 2 de Prog II
		Turma turmaC1 = turmaRepository.save(new Turma("C1", prof3, progI, 2025, "Manhã"));
		Turma turmaC2 = turmaRepository.save(new Turma("C2", prof3, progI, 2025, "Tarde"));
		Turma turmaD1 = turmaRepository.save(new Turma("D1", prof3, progII, 2025, "Noite"));
		Turma turmaD2 = turmaRepository.save(new Turma("D2", prof3, progII, 2025, "Manhã"));

		// Vanessa: 2 de BD I e 2 de BD II
		Turma turmaE1 = turmaRepository.save(new Turma("E1", prof2, bdI, 2025, "Tarde"));
		Turma turmaE2 = turmaRepository.save(new Turma("E2", prof2, bdI, 2025, "Noite"));
		Turma turmaF1 = turmaRepository.save(new Turma("F1", prof2, bdII, 2025, "Manhã"));
		Turma turmaF2 = turmaRepository.save(new Turma("F2", prof2, bdII, 2025, "Tarde"));

		// Inscrições de alunos em turmas (agora cada turma terá vários alunos)
		inscricaoRepository.save(new Inscricao(aluno1, turmaA1));
		inscricaoRepository.save(new Inscricao(aluno2, turmaA1));
		inscricaoRepository.save(new Inscricao(aluno3, turmaA1));
		inscricaoRepository.save(new Inscricao(aluno4, turmaA1));
		inscricaoRepository.save(new Inscricao(aluno5, turmaA1));

		inscricaoRepository.save(new Inscricao(aluno6, turmaA2));
		inscricaoRepository.save(new Inscricao(aluno7, turmaA2));
		inscricaoRepository.save(new Inscricao(aluno8, turmaA2));
		inscricaoRepository.save(new Inscricao(aluno9, turmaA2));
		inscricaoRepository.save(new Inscricao(aluno10, turmaA2));

		inscricaoRepository.save(new Inscricao(aluno1, turmaB1));
		inscricaoRepository.save(new Inscricao(aluno2, turmaB1));
		inscricaoRepository.save(new Inscricao(aluno3, turmaB1));
		inscricaoRepository.save(new Inscricao(aluno4, turmaB1));
		inscricaoRepository.save(new Inscricao(aluno5, turmaB1));

		inscricaoRepository.save(new Inscricao(aluno6, turmaB2));
		inscricaoRepository.save(new Inscricao(aluno7, turmaB2));
		inscricaoRepository.save(new Inscricao(aluno8, turmaB2));
		inscricaoRepository.save(new Inscricao(aluno9, turmaB2));
		inscricaoRepository.save(new Inscricao(aluno10, turmaB2));

		inscricaoRepository.save(new Inscricao(aluno1, turmaC1));
		inscricaoRepository.save(new Inscricao(aluno2, turmaC1));
		inscricaoRepository.save(new Inscricao(aluno3, turmaC1));
		inscricaoRepository.save(new Inscricao(aluno4, turmaC1));
		inscricaoRepository.save(new Inscricao(aluno5, turmaC1));

		inscricaoRepository.save(new Inscricao(aluno6, turmaC2));
		inscricaoRepository.save(new Inscricao(aluno7, turmaC2));
		inscricaoRepository.save(new Inscricao(aluno8, turmaC2));
		inscricaoRepository.save(new Inscricao(aluno9, turmaC2));
		inscricaoRepository.save(new Inscricao(aluno10, turmaC2));

		inscricaoRepository.save(new Inscricao(aluno1, turmaD1));
		inscricaoRepository.save(new Inscricao(aluno2, turmaD1));
		inscricaoRepository.save(new Inscricao(aluno3, turmaD1));
		inscricaoRepository.save(new Inscricao(aluno4, turmaD1));
		inscricaoRepository.save(new Inscricao(aluno5, turmaD1));

		inscricaoRepository.save(new Inscricao(aluno6, turmaD2));
		inscricaoRepository.save(new Inscricao(aluno7, turmaD2));
		inscricaoRepository.save(new Inscricao(aluno8, turmaD2));
		inscricaoRepository.save(new Inscricao(aluno9, turmaD2));
		inscricaoRepository.save(new Inscricao(aluno10, turmaD2));

		inscricaoRepository.save(new Inscricao(aluno1, turmaE1));
		inscricaoRepository.save(new Inscricao(aluno2, turmaE1));
		inscricaoRepository.save(new Inscricao(aluno3, turmaE1));
		inscricaoRepository.save(new Inscricao(aluno4, turmaE1));
		inscricaoRepository.save(new Inscricao(aluno5, turmaE1));

		inscricaoRepository.save(new Inscricao(aluno6, turmaE2));
		inscricaoRepository.save(new Inscricao(aluno7, turmaE2));
		inscricaoRepository.save(new Inscricao(aluno8, turmaE2));
		inscricaoRepository.save(new Inscricao(aluno9, turmaE2));
		inscricaoRepository.save(new Inscricao(aluno10, turmaE2));

		inscricaoRepository.save(new Inscricao(aluno1, turmaF1));
		inscricaoRepository.save(new Inscricao(aluno2, turmaF1));
		inscricaoRepository.save(new Inscricao(aluno3, turmaF1));
		inscricaoRepository.save(new Inscricao(aluno4, turmaF1));
		inscricaoRepository.save(new Inscricao(aluno5, turmaF1));

		inscricaoRepository.save(new Inscricao(aluno6, turmaF2));
		inscricaoRepository.save(new Inscricao(aluno7, turmaF2));
		inscricaoRepository.save(new Inscricao(aluno8, turmaF2));
		inscricaoRepository.save(new Inscricao(aluno9, turmaF2));
		inscricaoRepository.save(new Inscricao(aluno10, turmaF2));

		// Criar usuário ADMIN para avaliação (senha: password)
		String adminEmail = "admin@uff.com";
		if (usuarioRepository.findByEmail(adminEmail).isEmpty()) {
			Usuario admin = Usuario.builder()
					.nome("Administrador")
					.email(adminEmail)
					.senha(passwordEncoder.encode("password"))
					.role(Role.ADMIN)
					.build();
			usuarioRepository.save(admin);
		}
		// Criar usuário ADMIN para avaliação (senha: password)
		String userEmail = "user@uff.com";
		if (usuarioRepository.findByEmail(userEmail).isEmpty()) {
			Usuario admin = Usuario.builder()
					.nome("Usuário")
					.email(userEmail)
					.senha(passwordEncoder.encode("password"))
					.role(Role.USER)
					.build();
			usuarioRepository.save(admin);
		}
	}
}
