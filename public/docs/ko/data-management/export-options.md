# 내보내기 옵션

Link Band SDK는 수집된 데이터를 다양한 형식과 옵션으로 내보낼 수 있습니다. 연구 목적, 분석 도구, 저장 공간 등의 요구사항에 맞춰 최적의 내보내기 설정을 선택할 수 있습니다.

## 지원 파일 형식

### JSON 형식
- **장점**: 구조화된 데이터, 메타데이터 포함, 웹 친화적
- **단점**: 파일 크기가 큼
- **용도**: 웹 애플리케이션, API 연동, 구조화된 분석

```json
{
  "sensors": {
    "EEG": {
      "enabled": true,
      "channels": ["CH1", "CH2", "CH3", "CH4"],
      "data_type": "processed"
    },
    "PPG": {
      "enabled": true,
      "data_type": "raw"
    },
    "ACC": {
      "enabled": false
    }
  }
}
```

### 데이터 처리 
원시 데이터 와 처리된 데이터 제공:

- **원시 데이터**: 필터링되지 않은 원본 데이터
- **처리된 데이터**: 노이즈 제거 및 필터링 적용 후 분석된 결과(index) 포함

## 문제 해결

### 일반적인 문제
1. **메모리 부족**: 대용량 데이터 내보내기 시
2. **디스크 공간 부족**: 출력 디렉토리 용량 확인
3. **권한 오류**: 출력 디렉토리 쓰기 권한
4. **네트워크 오류**: 클라우드 업로드 실패

내보내기 기능을 통해 Link Band 데이터를 효율적으로 활용할 수 있습니다. 