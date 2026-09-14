---
sidebar_position: 2
title: 이벤트 흐름
---

# 이벤트 흐름

## Zone (비트 플래그)

```mermaid
block-beta
  columns 5
  LT["LT = Top|Left<br/>0b0100_0010"] space:3 RT["RT = Top|Right<br/>0b0100_0001"]
  LC["LC = Center|Left<br/>0b0010_0010"] space:3 RC["RC = Center|Right<br/>0b0010_0001"]
  LB["LB = Bottom|Left<br/>0b0001_0010"] space:3 RB["RB = Bottom|Right<br/>0b0001_0001"]
```

비트 플래그라 `zone & Zone.Left`, `zone & Zone.Top` 처럼 **방향만 검사**할 수 있습니다.

## EventStatus 상태 머신

```mermaid
stateDiagram-v2
  direction LR
  [*] --> None

  None --> AutoFlipFromCorner: zone mouseenter<br/>(또는 None 에서 mousemove)
  AutoFlipFromCorner --> AutoFlipFromCorner: zone mousemove<br/>모서리가 마우스를 따라감
  AutoFlipFromCorner --> AutoFlipToCorner: zone mouseleave
  AutoFlipToCorner --> None: 모서리 복귀 애니메이션 완료

  None --> Dragging: zone mousedown
  AutoFlipFromCorner --> Dragging: zone mousedown
  Dragging --> Dragging: document mousemove
  Dragging --> SnappingBack: mouseup · 원래 모서리에 가까움
  Dragging --> FlippingForward: mouseup · 반대 모서리에 가까움 (오른쪽→왼쪽)
  Dragging --> FlippingBackward: mouseup · 반대 모서리에 가까움 (왼쪽→오른쪽)
  SnappingBack --> None: animateFlip 완료
  FlippingForward --> None: animateFlip 완료 + shiftPages
  FlippingBackward --> None: animateFlip 완료 + shiftPages

  None --> Flipping: nextPage / prevPage / moveTo
  Flipping --> None: autoFlip 완료 + shiftPages
```

값도 비트 플래그로 설계되어 있습니다.

| 상태 | 값 | 포함 비트 |
| --- | --- | --- |
| `None` | `0b0000_0000` | – |
| `AutoFlip` | `0b0000_1000` | AutoFlip |
| `AutoFlipFromCorner` | `0b0000_1100` | AutoFlip |
| `AutoFlipToCorner` | `0b0000_1010` | AutoFlip |
| `Flipping` | `0b1000_0000` | Flipping |
| `SnappingBack` | `0b1001_0000` | Flipping |
| `FlippingForward` | `0b1010_0000` | Flipping |
| `FlippingBackward` | `0b1100_0000` | Flipping |
| `Dragging` | `0b1000_0000_0000` | Dragging |

`status & EventStatus.Flipping` 이 참이면 "어떤 종류든 자동으로 넘어가는 중" 이므로 새 입력을 무시합니다.

## 드래그로 넘기기 시퀀스

```mermaid
sequenceDiagram
  autonumber
  actor U as User
  participant Z as #mzZoneRB
  participant FV as FlipView
  participant FM as Flipping
  participant CSS as CSS 변수 / SVG

  U->>Z: mousedown
  Z->>FV: zoneMouseDowned(RB)
  FV->>FM: eventStatus = Dragging
  FV->>FM: setInitFlipping(RB, mouse, containerRect, zoom)
  Note right of FM: flipGRect · FlipActionLine · Diagonals<br/>activeCorner / opposite 계산
  FV->>FV: container 에 right-page-flipping, noselect 추가

  loop document mousemove
    U->>FV: documentMouseMove
    FV->>FM: flip(mouse, pageWH, isSpreadOpen)
    FM-->>FV: FlipData
    FV->>CSS: mask points · --page2-* · shadow gradient
  end

  U->>FV: document mouseup
  FV->>FM: getInfoToFlip(mouse)
  FM-->>FV: targetCorner · isSnappingBack · isFlippingForward
  FV->>FM: animateFlip(mouse → targetCorner)
  loop requestAnimationFrame (400ms, easeInOutQuad)
    FM->>FV: onFlip(point) → flipPage(point)
  end
  FM->>FV: onComplete
  FV->>FV: shiftPages() (넘어간 경우) · unsetViewerToFlip()
  FV->>FM: eventStatus = None
```

## 애니메이션 요약

| 함수 | 트리거 | 시간 | 이징 | 경로 |
| --- | --- | --- | --- | --- |
| `Flipping.animateFlipFromCorner` | zone 진입 | 300ms | easeInOutQuad | 모서리 → 마우스 (`AutoFlipType.MouseCursor`) |
| `Flipping.animateFlipToCorner` | zone 이탈 | 300ms | easeInOutQuad | 마우스 → 모서리 |
| `Flipping.animateFlip` | mouseup | 400ms | easeInOutQuad | 마우스 → 목표 모서리 (직선) |
| `FlipView.autoFlip` | next/prev/moveTo | 500ms | linear + `sin` | 오른쪽 아래 → 왼쪽 끝 (곡선, `offsetY`) |
