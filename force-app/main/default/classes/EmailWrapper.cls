public class EmailWrapper {

	public List<String> toAddress;
	public List<String> ccAddress;
	public String subject;
	public String body;
	public List<Files> files;

	public class Files {
		public String name;
		public String documentId;
		public String contentVersionId;
		public String contentBodyId;
		public String mimeType;
	}
}