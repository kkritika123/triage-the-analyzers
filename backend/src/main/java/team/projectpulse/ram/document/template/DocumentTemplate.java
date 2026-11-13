package team.projectpulse.ram.document.template;

import team.projectpulse.ram.requirement.SectionType;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class DocumentTemplate {

    private String title;
    private List<SectionTemplate> sections = new ArrayList<>();

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    // Templates are loaded once into DocumentTemplateRegistry and shared by every request, so callers get a
    // read-only view: a caller that edited this list would change the template for every later document.
    public List<SectionTemplate> getSections() {
        return Collections.unmodifiableList(sections);
    }

    // Called by the YAML mapper at load time; keep our own copy so the list cannot be changed from outside.
    public void setSections(List<SectionTemplate> sections) {
        this.sections = sections == null ? new ArrayList<>() : new ArrayList<>(sections);
    }

    public static class SectionTemplate {
        private String sectionKey;
        private String title;
        private SectionType type;
        private String guidance;

        public String getSectionKey() {
            return sectionKey;
        }

        public void setSectionKey(String sectionKey) {
            this.sectionKey = sectionKey;
        }

        public String getTitle() {
            return title;
        }

        public void setTitle(String title) {
            this.title = title;
        }

        public SectionType getType() {
            return type;
        }

        public void setType(SectionType type) {
            this.type = type;
        }

        public String getGuidance() {
            return guidance;
        }

        public void setGuidance(String guidance) {
            this.guidance = guidance;
        }
    }
}
