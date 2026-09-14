---
name: write-docs
description: Write or update the MagFlip Docusaurus docs (website/user-docs for library users, website/dev-docs for MagFlip developers) with diagrams. Use when documenting a feature, API, architecture, or when code changes require doc updates.
---

# MagFlip 문서 작성

## 1. 대상 결정

- 라이브러리 **사용자**가 알아야 하는 것(공개 API, 옵션, 예제) → `website/user-docs/`
- MagFlip **개발자**가 알아야 하는 것(파일, 내부 흐름, 계산, 빌드) → `website/dev-docs/`
- 둘 다라면 사용자 문서엔 사용법만, 개발자 문서에서 내부를 설명하고 서로 링크.

## 2. 사실 확인

문서에 적는 모든 API·기본값·동작은 `packages/*/src` 를 직접 읽고 확인한다. 추측으로 쓰지 않는다. 코드와 다르면 코드가 기준.

## 3. 작성

- 파일: 기존 폴더에 `.md` (JSX 컴포넌트를 쓰면 `.mdx`). front matter `title`, `sidebar_position`. 새 폴더면 `_category_.json`.
- 한국어로, 코드 식별자는 원문 그대로. 짧은 문단 + 표.
- **시각화를 먼저 고민한다**:
  - 흐름/의존 → `flowchart`, 호출 순서 → `sequenceDiagram`, 상태 → `stateDiagram-v2`, 클래스 → `classDiagram`, 격자(zone, 슬롯) → `block-beta`
  - 폴더 → `import FileTree from '@site/src/components/FileTree';` `<FileTree nodes={[...]} />`
  - 실제 동작 → `import DemoFrame from '@site/src/components/DemoFrame';`
- `.md` 본문의 `<`, `{` 는 코드 스팬으로. Mermaid 라벨의 줄바꿈은 `<br/>`.
- 링크: 같은 문서 세트는 상대 파일 경로(`./x.md`), 다른 세트는 `/user/...` 또는 `/dev/...`.

## 4. 검증

```bash
cd website && npm run build      # 깨진 링크/MDX 에러 시 실패
npm run serve                     # http://localhost:3000
```

Mermaid 문법 오류는 빌드에서 잡히지 않는다. 브라우저에서 해당 페이지의 모든 다이어그램이 그려졌는지 확인한다 (라이트/다크 모드 둘 다).

## 5. 연쇄 갱신

구조 변경이면 `CLAUDE.md`(루트/패키지)와 관련 skill 도 함께 갱신. 알려진 이슈는 `dev-docs/known-issues.md`.
